const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
	attendanceList: [{
		date: String,
		timeSlot: String,
		status: String,
		classType: String
	}]
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
module.exports.attendanceStatus = {
	inTime: 'InTime',
	late: 'Late',
	acceptable: 'Acceptable'
};