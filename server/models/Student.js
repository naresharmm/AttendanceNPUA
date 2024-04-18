const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
