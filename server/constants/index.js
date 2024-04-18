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

const momentWeekDayToHumanFriendly = {
	1: availableWeekDays.monday,
	2: availableWeekDays.tuesday,
	3: availableWeekDays.wednesday,
	4: availableWeekDays.thursday,
	5: availableWeekDays.friday
}

const dateOffNumbers = {
	1 : 'Երկուշաբթի',
	2 : 'Երեքշաբթի',
	3 : 'Չորեքշաբթի',
	4 : 'Հինգշաբթի',
	5 : 'Ուրբաթ',
}

module.exports = {availableTimeslots, availableWeekDays, toMomentWeekDays, dateOffNumbers};