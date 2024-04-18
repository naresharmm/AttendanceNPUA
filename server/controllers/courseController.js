const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const hasRole = require("../middleware/roleMiddleware");
const {ROLES} = require("../models/User");
const User = require("../models/User");
const Group = require("../models/Group");
const Role = require("../models/Role");
const Course = require("../models/Course");



router.get('/', verifyToken, async (req, res) => {
    try {
        // Fetch courses from the database
        const courses = await Course.find();

        // Send courses as response
        return res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;