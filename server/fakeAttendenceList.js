const mongoose = require('mongoose');
const Group = require('./models/Group');
const Room = require('./models/Room');
const ClassType = require('./models/ClassType');
const Role = require('./models/Role');
const User = require('./models/User');
const {ROLES, attendanceStatus} = require("./models/User");
const {availableWeekDays, availableTimeslots} = require('./constants/index')
const moment = require('moment');
const {toMomentWeekDays} = require("./constants");
const Course = require("./models/Course");

async function generateMockData() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydba');
        const groups = await Group.find({})
        const users = await User.find({}).populate('role');
        const students = users.filter(user => user.role.name === 'Student');
        const classTypes = await ClassType.find({})
        console.log('groups:', groups)
        await createFakeAttendanceListData(groups, students, classTypes);
    } catch (error) {
        console.error('Error generating mock data:', error);
    } finally {
        mongoose.disconnect();
    }
}
const createFakeAttendanceListData = async (groups, students, classTypes) => {
    try {
        const startDate = moment('2023-09-01', 'YYYY-MM-DD').startOf('week'); // Start from the beginning of the week
        const endDate = moment('2023-12-24', 'YYYY-MM-DD').endOf('week'); // End at the end of the week
        const attendanceValues = Object.values(attendanceStatus);

        for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'week')) {
            const weekStartDate = m.startOf('week').format('YYYY-MM-DD'); // Start date of the week
            const weekEndDate = m.endOf('week').format('YYYY-MM-DD'); // End date of the week

            for (let group of groups) {
                for (let lesson of group.lessonSchedule) {
                    console.log(group)
                    const isOddWeek = m.week() % 2 === 1;
                    const isEvenWeek = m.week() % 2 === 0;

                    if ((isOddWeek && !lesson.onOddWeek) || (isEvenWeek && !lesson.onEvenWeek)) {
                        continue; // Skip this lesson if it's not scheduled for the current week
                    }

                    for (let studentId of lesson.students) {
                        const user = await User.findById(studentId).populate('attendanceList');
                        if (!user) {
                            console.error(`User not found for ID: ${studentId}`);
                            continue; // Skip if user not found
                        }

                        // Generate fake attendance data only within the bounds of the current week
                        const fakeAttendanceObj = {
                            week: m.week(),
                            status: attendanceValues[Math.floor(Math.random() * attendanceValues.length)],
                            lessonId: lesson._id,
                            date: moment().year(2023).day(toMomentWeekDays[lesson.dayOfWeek]).week(m.week()).format('DD-MM-YYYY'),
                            timeSlot: lesson.timeSlot,
                            groupName: group.shortName
                        };

                        user.attendanceList.push(fakeAttendanceObj);
                        await user.save();
                    }
                }
            }
        }

        console.log('Mock data generated successfully');
    } catch (err) {
        console.error('Error generating mock data in createFakeAttendanceListData:', err);
    }
};

generateMockData()
// module.exports = generateMockData;