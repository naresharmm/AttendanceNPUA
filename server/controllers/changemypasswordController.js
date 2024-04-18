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
require('../db')


router.post('/',
	verifyToken,
	async (req, res) => {
        try {
            // Retrieve user from request object
            const user = await User.findById(req.userId)
            // console.log(user)
            // Retrieve password fields from request body
            const { currentpassword, newpassword, confirmnewpassword } = req.body;
        
            // Check if new password and confirm password match
            if (newpassword !== confirmnewpassword) {
              return res.status(400).json({ message: "Գաղտնաբառերը չեն համընկնում" });
            }
        
            // Check if current password is correct
            const isPasswordMatch = await bcrypt.compare(currentpassword, user.password);
            if (!isPasswordMatch) {
              return res.status(200).json({ retcode: false });
            }
            // console.log(newpassword)
            // Hash the new password
            // const hashedPassword = await bcrypt.hash(newpassword, 10);
        
            // Update user's password
            // user.password = hashedPassword;

            user.password = newpassword;
            await user.save();
            // Return success message
            res.status(200).json({ retcode: true });
          } catch (error) {
            console.error('Error changing password:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
});


module.exports = router;