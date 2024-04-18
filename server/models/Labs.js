// Import mongoose
const mongoose = require('mongoose');

// Define the schema for Teacher
const teacherSchema = new mongoose.Schema({
    name: String,
    // Any other properties related to teacher can be added here
});

// Define the schema for Room
const roomSchema = new mongoose.Schema({
    name: String,
    // Any other properties related to room can be added here
});

// Define the schema for Course
const courseSchema = new mongoose.Schema({
    name: String,
    // Any other properties related to course can be added here
});

// Define the schema for Laboratory
const laboratorySchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    // Any other properties related to laboratory can be added here
});

// Define the schema for Schedule
const scheduleSchema = new mongoose.Schema({
    laboratory: { type: mongoose.Schema.Types.ObjectId, ref: 'Laboratory' },
    dayOfWeek: String,
    time: String,
    // Any other properties related to schedule can be added here
});

// Define models based on the schemas
const Teacher = mongoose.model('Teacher', teacherSchema);
const Room = mongoose.model('Room', roomSchema);
const Course = mongoose.model('Course', courseSchema);
const Laboratory = mongoose.model('Laboratory', laboratorySchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);

// Export the models
module.exports = { Teacher, Room, Course, Laboratory, Schedule };
