const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {getClassSchedule, getClassCreateParams} = require("../models/ClassSchedule");
const hasRole = require("../middleware/roleMiddleware");
const {ROLES} = require("../models/User");
const Course = require('../models/Course');
const Group = require('../models/Group');
const Room = require('../models/Room');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const User = require('../models/User');
const ClassType = require('../models/ClassType');
const {availableTimeslots, availableWeekDays} = require("../constants");



async function assignStudentsToClassTypes(students, courses) {
	let classTypes = [];
	for (const course of courses) {
		const studentsForCourse = students.filter(student => student.course.toString() === course._id.toString());
		const studentsGroupIds = {
			1: studentsForCourse.slice(0, 9).map(s => s._id),
			2: studentsForCourse.slice(9, 17).map(s => s._id),
			3: studentsForCourse.slice(17, 25).map(s => s._id),
			4: studentsForCourse.slice(25).map(s => s._id),
		};
		const courseClassTypes = [
			{ name: `Լաբ. 1 (${course.name})`, students: studentsGroupIds[1] },
			{ name: `Լաբ. 2 (${course.name})`, students: studentsGroupIds[2] },
			{ name: `Լաբ. 3 (${course.name})`, students: studentsGroupIds[3] },
			{ name: `Լաբ. 4 (${course.name})`, students: studentsGroupIds[4] },
			{ name: `Դաս. (${course.name})`, students: studentsForCourse.map(s => s._id) },
			{ name: `Գործ. 1 (${course.name})`, students: [...studentsGroupIds[1],...studentsGroupIds[2]] },
			{ name: `Գործ. 2 (${course.name})`, students: [...studentsGroupIds[3],...studentsGroupIds[4]] },
			{ name: `ԿԱ 1 (${course.name})`, students: [...studentsGroupIds[1],...studentsGroupIds[2]] },
			{ name: `ԿԱ 2 (${course.name})`, students: [...studentsGroupIds[3],...studentsGroupIds[4]] }
			// Add more class types if needed
		];
		classTypes.push(...courseClassTypes);
	}
	return classTypes;
}




// Create class
router.post('/class', async(req, res) => {
    const { group, teacher, course, room, classType, timeSlot, dayOfWeek, onEvenWeek, onOddWeek } = req.body; //course
	// console.log(req.body)



	// Usage example
			// const newUser = await User.create({ /* user data */ });

// Fetch all students and courses
// 	const students = await User.find({});
// 	const courses = await Course.find({});

// // Now you can update class types for each course
// 	const classTypes = await ClassType.create(await assignStudentsToClassTypes(students, courses));

// const classTypeById = await ClassType.findOne({ course: course, name: classType })
// const objToInsert = {dayOfWeek: dayOfWeek, room, classType, teacher, timeSlot, students: classTypeById.students, onOddWeek, onEvenWeek }; //course
// console.log(classTypeById.students)

	// const classTypeById = await ClassType.findById(classType);
	const classTypeById = await ClassType.findOne({ course: course, name: classType });
	const newclassType = classTypeById._id;
	const objToInsert = {dayOfWeek: dayOfWeek, room, classType: newclassType, teacher, timeSlot, students: classTypeById.students, onOddWeek, onEvenWeek }; //course
	// console.log(classTypeById._id)
	// console.log("asd: ",objToInsert)
	try {
		await Group.findByIdAndUpdate(group, {
			$push: {
				lessonSchedule: objToInsert
			}
		});

		res.json(objToInsert);
	} catch (err) {
		res.status(500).json(err)
	}
});








router.get('/class',
    verifyToken,
    (req, res, next) => hasRole(req, res, next, [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.STUDENT, ROLES.TEACHER]),
    async (req, res) => {
        try {
			// console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
			const { courseId } = req.query;
			// console.log("bbbbbbbbbbbbbbbbbbbbbbbbbb")
			const user = await User.findById(req.userId).populate('username').populate('_id').populate('role');
			if (courseId) {
				const schedule = await getClassSchedule(courseId, user.role.name);
				res.json(schedule);
				// console.log('Course ID:', courseId);
			  } 
			  else {
					// console.log("ELSEEEEEEEEEEEEEE")
					if (user && user.role.name == 'Student'){
						// console.log('ROle:', user.role.name);
						const schedule = await getClassSchedule(user.course, user.role.name);
						res.json(schedule);
					}
					else if (user && user.role.name == 'Teacher'){
						// console.log('ROle:', user.role.name);
						const schedule = await getClassSchedule(user._id, user.role.name);
						res.json(schedule);
					}
					else{
						//(!user || !user.course)
					    return res.status(400).json({ error: 'User not found or no course associated' });
					}
					
				// If courseId does not exist in the query string
				// console.log('No course ID provided in the query string');
			  }
			// console.log(res)
			// const data = await getClassSchedule();
            // Get the user's information
			// console.log("REQ :", req.userId)
			// console.log("RES: ", res)
			// console.log("courseId: ", courseId);
			
			// console.log('user populate: ', user.populate('role'))
            // Check if the user exists and has a course associated with them
					

            // Call getClassSchedule with the user's course ID
            		
				
			// console.log("DIFF: ", courseId)
			
			
            // Send the schedule data as response
        } catch (err) {
            console.error('Error fetching class schedule:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);




// Read all classes
// router.get('/class',
//     verifyToken,
//     (req, res, next) => hasRole(req, res, next, [ROLES.SUPERADMIN,ROLES.ADMIN, ROLES.STUDENT, ROLES.TEACHER]), //
//     (req, res) => {
	
// 	getClassSchedule()
// 		.then((data) => res.json(data))
// 		.catch((err) => res.status(500).json(err));
// });

router.get('/class/params', verifyToken, (req, res, next) => hasRole(req, res, next, [ROLES.ADMIN]), (req, res) => {
	getClassCreateParams().then(val => {
		res.json(val)
	}).catch(err => res.status(500).json(err))
})

// Update class
// router.put('/class/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, startDate, endDate, room, teacher, link } = req.body;
//     Class.findByIdAndUpdate(id, { name, startDate, endDate, room, teacher, link }, { new: true })
//         .then((data) => res.json(data))
//         .catch((err) => res.status(500).json(err));
// });
//

// Delete class
router.post('/class/delete/', async(req, res) => {
	const { lessonScheduleId, groupId} = req.body;

	try {
		const group = await Group.findById(groupId);
		group.lessonSchedule.pull({ _id: lessonScheduleId });
		await group.save();
		return res.sendStatus(200)
	} catch (error) {
		return res.sendStatus(500).json(error)
	}
});

module.exports = router;