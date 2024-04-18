const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    shortName: {
        type: String,
        unique: true
    },
    lessonSchedule: [{
        dayOfWeek: {
            type: String,
         },
        timeSlot: {
            type: String,
         },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        },
        classType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClassType'
        },
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        onOddWeek: Boolean,
        onEvenWeek: Boolean
    }],
    // students: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    time: {
        type: String,
    }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;