const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const hasRole = require("../middleware/roleMiddleware");
const {ROLES} = require("../models/User");
const User = require("../models/User");
const Group = require("../models/Group");

router.get('/',
	verifyToken,
	(req, res, next) => hasRole(req, res, next, [ROLES.STUDENT]),
	(req, res) => {
		const userId = req.userId;
		const studentId = req.query.studentId;

		//If the logged user is student get the student Id as userId.
		//If the logged user is teacher get the student id from params.
		User.findById(studentId !== 'null' ? studentId : userId).populate('attendanceList.lessonId').exec().then(async user => {
			// Group.find({}).populate('lessonSchedule.classType').populate('lessonSchedule.room').populate('lessonSchedule.teacher')
			// 	.then(groups => {
			// 		const lessonSchedulesByGroups = {};
			//
			// 		for(let group of groups) {
			// 			for(lesson of group.lessonSchedule) {
			// 				if (lesson.students.includes(studentId !== 'null' ? studentId : userId)) {
			// 					lessonSchedulesByGroups[group.shortName] = lessonSchedulesByGroups[group.shortName] || [];
            //                     lessonSchedulesByGroups[group.shortName].push(lesson);
			// 				}
			// 			}
			// 		}
			//
			// 		// const currentGroup = groups.filter(group => group.students.includes(studentId !== 'null' ? studentId : userId))[0];
			// 		// Group.findOne({ 'lessonSchedule._id': someId })
			// 		// 	.then(group => {
			// 		// 		let item = group.lessonSchedule.id(someId);
			// 		// 		// do something with item
			// 		// 	})
			// 		// 	.catch(err => {
			// 		// 		console.error(err);
			// 		// 	});
			//
			// 		res.json({
			// 			attendanceList: user.attendanceList,
			// 			// lessonSchedule: currentGroup['lessonSchedule'],
			// 			// group: {name: currentGroup.shortName, id: currentGroup._id}
			// 			lessonSchedulesByGroups
			// 		})
			// 	})

			const groups = await Group.find({}).populate('lessonSchedule.classType').populate('lessonSchedule.room').populate('lessonSchedule.teacher');
			res.json({groups, attendanceList: user.attendanceList, userLessonIds: user.lessons, userId});
		}).catch(err => {
			console.log(err)
			res.status(500).json(err)
		})

	});

module.exports = router;