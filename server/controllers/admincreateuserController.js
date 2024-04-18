const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Role = require("../models/Role");
const multer = require('multer'); // Import multer
const path = require('path');
const Course = require("../models/Course");
const ClassType = require('../models/ClassType');
const Group = require('../models/Group');
require('../db');

// Define storage for avatar files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('avatar'), async (req, res) => { // Add upload middleware
    try {
        const getuser = req.body;
        const avatarPath = req.file ? req.file.path : null; // Get avatar file path
        const iscreate = createFakeUser(getuser, avatarPath);
        return res.status(200).json({ retcode: iscreate });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});






async function updateCourseClassTypes(courseClassTypes) {
    // console.log(courseClassTypes)
    try {
        for (const classType of courseClassTypes) {
            // Find the existing course class type by name and course ID
            const existingClassType = await ClassType.findOne({ name: classType.name, course: classType.course });
            if (existingClassType) {
                // Update the students for the existing class type with the new students
                existingClassType.students = classType.students;
                await existingClassType.save();

                // Find the groups containing this class type in their lesson schedule
                const groups = await Group.find({ 'lessonSchedule.classType': existingClassType._id });

                // Update the students in the lesson schedule of each group
                for (const group of groups) {
                    for (const lesson of group.lessonSchedule) {
                        if (lesson.classType.equals(existingClassType._id)) {
                            lesson.students = classType.students;
                        }
                    }
                    await group.save();
                }
            } else {
                console.log(`Course class type ${classType.name} for course ${classType.course} not found.`);
            }
        }
        console.log('Course class types updated successfully.');
    } catch (error) {
        console.error('Error updating course class types:', error);
    }
}

// async function updateCourseClassTypes(courseClassTypes) {
//     try {
//         for (const classType of courseClassTypes) {
//             // Find the existing course class type by name and course ID
//             const existingClassType = await ClassType.findOne({ name: classType.name, course: classType.course });
//             if (existingClassType) {
//                 // console.log(`Course class type ${classType.name} for course ${classType.course} ISSSSSSS found.`);
//                 // Update the students for the existing class type with the new students
//                 existingClassType.students = classType.students;
//                 await existingClassType.save();
//             } else {
//                 console.log(`Course class type ${classType.name} for course ${classType.course} not found.`);
//             }
//         }
//         console.log('Course class types updated successfully.');
//     } catch (error) {
//         console.error('Error updating course class types:', error);
//     }
// }


async function createFakeUser(getuser, avatarPath) {
    try {
        const newuser = {
            username: getuser['username'],
            email: getuser['email'],
            password: getuser['password'],
            avatar: avatarPath, // Add avatar path to user data
        };
        
        const rolee = getuser['role'];
        const roles = await Role.find({});
        const rolesObj = {};
        roles.map(i => { rolesObj[i.name] = i.id });

        const courses = await Course.find({});
        const coursesObj = {};
        courses.map(j => {coursesObj[j.name] = j.id});
        // console.log(coursesObj)
        let newuserwithRole = ''
        if (rolee == 'SuperAdmin') {
            newuserwithRole = { ...newuser, role: rolesObj['SuperAdmin']};
        } else if (rolee == 'Admin') {
            newuserwithRole = { ...newuser, role: rolesObj['Admin']};
        } else if (rolee == 'Teacher') {
            newuserwithRole = { ...newuser, role: rolesObj['Teacher']};
        } else if (rolee == 'Student') {
            newuserwithRole = { ...newuser, role: rolesObj['Student'], course: coursesObj[getuser['course']]};
        }

        const [cnewuser] = await Promise.all([
            User.create(newuserwithRole),
        ]);
        

        if (rolee == 'Student'){
            const users = await User.find({}).populate('role');
            const students = users.filter(user => user.role.name === 'Student');
            // console.log(cnewuser.course.toString())
            // students.map(student => {
            //     console.log(`Student ID: ${student._id}, Course: ${student.course}`);
            // });
            const students_in_mycourse = students.filter(student => student.course && student.course.toString() === cnewuser.course.toString());
            // students_in_mycourse.map(student => {
            //     console.log(`Student ID: ${student._id}, Course: ${student.course}`);
            // });
            // console.log(students_in_mycourse)
            const len = students_in_mycourse.length;
            const groupSize = Math.ceil(len / 4);
            
            const studentsGroupIds = {
                1: students_in_mycourse.slice(0, groupSize).map(s => s._id),
                2: students_in_mycourse.slice(groupSize, 2*groupSize).map(s => s._id),
                3: students_in_mycourse.slice(2*groupSize, 3*groupSize).map(s => s._id),
                4: students_in_mycourse.slice(3*groupSize).map(s => s._id),
            };
            const courseClassTypes = [
                { name: `Լաբ. 1 `, students: studentsGroupIds[1], course: coursesObj[getuser['course']] },
                { name: `Լաբ. 2 `, students: studentsGroupIds[2] , course: coursesObj[getuser['course']]},
                { name: `Լաբ. 3 `, students: studentsGroupIds[3] , course: coursesObj[getuser['course']]},
                { name: `Լաբ. 4 `, students: studentsGroupIds[4] , course: coursesObj[getuser['course']]},
                { name: `Դաս. `, students: students_in_mycourse.map(s => s._id), course: coursesObj[getuser['course']] },
                { name: `Գործ. 1 `, students: [...studentsGroupIds[1],...studentsGroupIds[2]], course: coursesObj[getuser['course']] },
                { name: `Գործ. 2 `, students: [...studentsGroupIds[3],...studentsGroupIds[4]], course: coursesObj[getuser['course']] },
                { name: `ԿԱ 1 `, students: [...studentsGroupIds[1],...studentsGroupIds[2]], course: coursesObj[getuser['course']] },
                { name: `ԿԱ 2 `, students: [...studentsGroupIds[3],...studentsGroupIds[4]] , course: coursesObj[getuser['course']]}
                // Add more class types if needed
            ];

            updateCourseClassTypes(courseClassTypes);

            // const classTypes = await ClassType.find({ course: course._id });
            // const updatedClassTypes = await Promise.all(classTypes.map(async (classType) => {
            //     classType.students.push(cnewuser._id);
            //     return classType.save();
            // }));
    
            // const groups = await Group.find({ 'lessonSchedule.classType': { $in: updatedClassTypes.map(ct => ct._id) } });
    
            // await Promise.all(groups.map(async (group) => {
            //     group.lessonSchedule.forEach((schedule) => {
            //         if (updatedClassTypes.some(ct => ct._id.equals(schedule.classType))) {
            //             schedule.students = updatedClassTypes.find(ct => ct._id.equals(schedule.classType)).students;
            //         }
            //     });
            //     return group.save();
            // }));    
        }
        console.log(`Fake user inserted with _id: ${cnewuser._id}`);
        return true;
    } catch (error) {
        console.error('Error creating fake user:', error);
        return false;
    }
}





module.exports = router;