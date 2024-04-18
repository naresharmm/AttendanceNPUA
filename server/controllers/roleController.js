const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const verifyToken = require("../middleware/authMiddleware");

router.get('/', verifyToken, async (req, res) => {
    try {
        // Fetch all roles from the database
        const roles = await Role.find({});

        // Return the roles data as JSON with a 200 status
        return res.status(200).json(roles);
    } catch (error) {
        // If an error occurs, log the error and return a 500 status with an error message
        console.error('Error fetching roles:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
