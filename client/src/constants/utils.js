const availableTimeslots = ['9:30 - 10:50', '11:00 - 12:20', '12:50 - 14:10', '14:20 - 15:40'];

const availableWeekDays = {
	monday: 'Երկուշաբթի',
	tuesday: 'Երեքշաբթի',
	wednesday: 'Չորեքշաբթի',
	thursday: 'Հինգշաբթի',
	friday: 'Ուրբաթ',
};

const toMomentWeekDays = {
	[availableWeekDays.monday]: 1,
	[availableWeekDays.tuesday]: 2,
	[availableWeekDays.wednesday]: 3,
	[availableWeekDays.thursday]: 4,
	[availableWeekDays.friday]: 5,
}

const toHumanWeekDay = {
	1: availableWeekDays.monday,
	2: availableWeekDays.tuesday,
	3: availableWeekDays.wednesday,
	4: availableWeekDays.wednesday,
	5: availableWeekDays.friday
}

const attendanceStatus = {
	inTime: 'InTime',
	late: 'Late',
	acceptable: 'Acceptable'
};

const attendanceStatusTranslate = {
	[attendanceStatus.inTime]: 'Ժամանակին',
	[attendanceStatus.late]: 'Բացակա',
	[attendanceStatus.acceptable]: 'Հարգելի'
};

module.exports = {availableTimeslots, availableWeekDays, toMomentWeekDays, attendanceStatusTranslate, attendanceStatus, toHumanWeekDay};