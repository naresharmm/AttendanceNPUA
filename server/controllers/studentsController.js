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
	// (req, res, next) => hasRole(req, res, next, [ROLES.ADMIN, ROLES.TEACHER]),
	async (req, res) => {
		const roles = await Role.find({});
		const rolesObj = {};
		roles.map(i => {rolesObj[i.name] = i.id})

		const students = await User.find({role: rolesObj[ROLES.STUDENT]}).populate('username').populate('_id').populate('role')

		const arrList = students.filter(i => !!i.username).map(student => {

			return {
				role: student.role.name,
				username: student?.username,
				id: student.id,
				course: student.course,
				attendanceList: student.attendanceList.sort((a, b) => a.date - b.date)
			}
		})

		res.json(arrList)
	});

router.post('/',
	verifyToken,
	// (req, res, next) => hasRole(req, res, next, [ROLES.ADMIN, ROLES.TEACHER]),
	async (req, res) => {
		try {
			const {selectedStatus, selectedLessonId, selectedDate, selectedStudentId} = req.body;

			const student = await User.findById(selectedStudentId);
			const index = student.attendanceList.findIndex(i => {
				const stringifiedId = i._id.toString()
				return  stringifiedId === selectedLessonId && i.date === selectedDate
			})

			student.attendanceList[index].status = selectedStatus;
			student.save()

			res.sendStatus(200)
		} catch (err) {
			res.sendStatus(500).json(err)
		}
	}
)

module.exports = router;