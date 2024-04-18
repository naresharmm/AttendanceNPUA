const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
     },
     email: {
        type: String,
        unique: true
     },
     password: String,
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;