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
const Group = require('../models/Group');
require('../db')


router.post('/', async (req, res) => {
    try {
        const getobject = req.body
        const iscreate = await createnewobject(getobject);
        return res.status(200).json({ retcode: iscreate });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});





async function createnewobject(getobject) {
    try {
        const group = await Group.create([
            {
                name: getobject.name,
                shortName: getobject.shortName,
                lessonSchedule: [],
            },
        ]);

        console.log(`Object inserted with _id: ${group._id}`);
        return true;
    } catch (error) {
        console.error('Error creating Object:', error);
        return false;
    } 
}


module.exports = router;