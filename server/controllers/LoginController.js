const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Users = require('../models/User');

router.post('/login', async (req, res) => {
    const { email,  password } = req.body;

    try {

        const user =  await Users.findOne({email}).populate('role');
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const passwordMatch =  await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const roles = user.role ? [user.role.name] : [];

        const token = jwt.sign({ userId: user._id}, 'secret', { expiresIn: '1w' });

        res.json({ message: 'Login successful', token,  roles, permissions: []  });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;