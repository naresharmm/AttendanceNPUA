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
const hasRole = require("../middleware/roleMiddleware");
const {ROLES} = require("../models/User");

require('../db')

router.post('/',
	verifyToken,
	(req, res, next) => hasRole(req, res, next, [ROLES.SUPERADMIN,ROLES.ADMIN]),
	async(req, res) => {
        try {
            userId = req.body.selectedStudent;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(200).json({ retcode: false });
            }
            return res.status(200).json({ retcode: true });
        } catch (error) {
            console.error('Error fetching user data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
});

module.exports = router;