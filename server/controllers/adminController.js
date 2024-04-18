const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const hasRole = require("../middleware/roleMiddleware");
const {ROLES} = require("../models/User");
const User = require("../models/User");
const Group = require("../models/Group");
const Role = require("../models/Role");


router.get('/',
	verifyToken,
	(req, res, next) => hasRole(req, res, next, [ROLES.SUPERADMIN,ROLES.ADMIN]),
	(req, res) => {
		const userId = req.userId;
		const studentId = req.query.studentId;
		User.findById(studentId !== 'null' ? studentId : userId).populate('attendanceList.lessonId').exec().then(async user => {
			const groups = await Group.find({}).populate('lessonSchedule.classType').populate('lessonSchedule.room').populate('lessonSchedule.teacher');
			res.json({groups, attendanceList: user.attendanceList, userLessonIds: user.lessons, userId});
		}).catch(err => {
			console.log(err)
			res.status(500).json(err)
		})

	});
	
module.exports = router;