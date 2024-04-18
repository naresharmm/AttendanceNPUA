const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
