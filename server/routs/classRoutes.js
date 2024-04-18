const express = require('express');

const {getClassSchedule} = require("../models/ClassSchedule");

const router = express.Router();

router.get('/class-schedule', async (req, res) => {
    try {

         const classSchedule = await getClassSchedule();

         res.json(classSchedule);
    } catch (error) {
        // Handle errors
        console.error('Error fetching class schedule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

 module.exports = router;