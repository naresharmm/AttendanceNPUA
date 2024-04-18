const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const hasRole = require("../middleware/roleMiddleware");
const {ROLES} = require("../models/User");
const User = require("../models/User");
const Group = require("../models/Group");
const Role = require("../models/Role");
// const {ROLES} = require("../models/User");


// router.get('/', verifyToken, async (req, res) => {
//     try {
//         return res.status(200).json({ message: "asdasd" });
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// });



router.get('/', verifyToken, async (req, res) => {
    try {
        const roles = await Role.find({});
        const rolesObj = {};
        roles.map(i => {rolesObj[i.name] = i.id})

        const user = await User.findById(req.userId).populate('username').populate('_id').populate('role').populate('course');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;