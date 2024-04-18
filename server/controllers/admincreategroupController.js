const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Role = require("../models/Role");
const uri = 'mongodb://localhost:27017/mydba';
const Course = require("../models/Course");
const ClassType = require("../models/ClassType")
require('../db')


router.post('/', async (req, res) => {
    try {
        const getgroup = req.body;
        const iscreate = await createnewgroup(getgroup);
        return res.status(200).json({ retcode: iscreate });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


async function createnewgroup(getgroup) {
    try {
        const course = await Course.create({ name: getgroup.name });
        console.log(`Course inserted with _id: ${course._id}`);
        const courseClassTypes = [
            { name: `Լաբ. 1 `, students: [], course: course._id },
            { name: `Լաբ. 2 `, students: [] , course: course._id},
            { name: `Լաբ. 3 `, students: [] , course: course._id},
            { name: `Լաբ. 4 `, students: [] , course: course._id},
            { name: `Դաս. `, students: [], course: course._id },
            { name: `Գործ. 1 `, students: [], course: course._id },
            { name: `Գործ. 2 `, students: [], course: course._id },
            { name: `ԿԱ 1 `, students: [], course: course._id },
            { name: `ԿԱ 2 `, students: [] , course: course._id}
            // Add more class types if needed
        ];
        const classTypes = ClassType.create(courseClassTypes);
        console.log(classTypes)
        return true;
    } catch (error) {
        console.error('Error creating Course:', error);
        return false;
    } 
}


module.exports = router;