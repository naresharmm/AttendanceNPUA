const Group = require('./Group');
const Room = require('./Room');
const User = require('./User');
const Student = require('./Student');
const ClassTypes = require('./ClassType');
const {ro} = require("faker/lib/locales");
const {availableWeekDays, availableTimeslots} = require('../constants/index')
const Role = require("./Role");
const {ROLES} = require("./User");
const Course = require('./Course');






async function getClassSchedule(requestId, requestRole) {
    try {
        const schedule = {};
        if(requestRole == 'Teacher'){
            // console.log("Teacher_id: ", requestId)
             // Find all class types with the provided course ID
             const classTypes = await ClassTypes.find();
             // console.log("courseID: ", courseId)
             // console.log("classTypes: ",classTypes)
             // Get the IDs of the found class types
             const classTypeIds = classTypes.map(type => type._id);
            // Fetch all groups and populate the lesson schedules
             const groups = await Group.find({})
             .populate('lessonSchedule.teacher')
             .populate('lessonSchedule.room')
             .populate('lessonSchedule.classType')
             .populate({
                path: 'lessonSchedule.classType',
                populate: {
                    path: 'course'
                }
            });
             
             // Initialize the schedule object
             
             Object.values(availableWeekDays).map(v => schedule[v] = {});
             groups.forEach(group => {
                 group.lessonSchedule.forEach(lesson => {
                    //  console.log("lesson: ", lesson)
                     const { dayOfWeek, timeSlot, teacher, room, classType, _id } = lesson;
                     // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                     // console.log("classTypeIds: ", classTypeIds)
                     // console.log("classType._id: ",classType._id)
     
                     // Check if the lesson's class type ID is in the found class type IDs
     
                     // classTypeIds.includes(classType._id
                     if (requestId.toString() == lesson.teacher._id.toString()) {
                        

                         // console.log("Includes: ",classTypeIds ," : " ,classType._id)
                         // console.log(group.shortName,room.name,teacher.username,classType.name,_id, group._id)
                         const obj = {
                             groupName: group.shortName,
                             room: room.name,
                             teacher: teacher.username,
                             classType: classType,// .name
                             lessonScheduleId: _id,
                             groupId: group._id,
                             onOddWeek: lesson.onOddWeek,
                             onEvenWeek: lesson.onEvenWeek
                         };
     
                         if (!schedule[dayOfWeek]) {
                             schedule[dayOfWeek] = {};
                         }
     
                         if (schedule[dayOfWeek][timeSlot]) {
                             schedule[dayOfWeek][timeSlot].push(obj);
                         } else {
                             schedule[dayOfWeek][timeSlot] = [obj];
                         }
                     }
                 });
             });
        }
        else{
            // Find all class types with the provided course ID
            const classTypes = await ClassTypes.find({ course: requestId });
            // console.log("courseID: ", courseId)
            // console.log("classTypes: ",classTypes)
            // Get the IDs of the found class types
            const classTypeIds = classTypes.map(type => type._id);
           // Fetch all groups and populate the lesson schedules
            const groups = await Group.find({})
            .populate('lessonSchedule.teacher')
            .populate('lessonSchedule.room')
            .populate('lessonSchedule.classType');

            // Initialize the schedule object
            // const schedule = {};
            Object.values(availableWeekDays).map(v => schedule[v] = {});
            groups.forEach(group => {
                group.lessonSchedule.forEach(lesson => {
                    // console.log("lesson: ", lesson)
                    const { dayOfWeek, timeSlot, teacher, room, classType, _id } = lesson;
                    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                    // console.log("classTypeIds: ", classTypeIds)
                    // console.log("classType._id: ",classType._id)
    
                    // Check if the lesson's class type ID is in the found class type IDs
    
                    // classTypeIds.includes(classType._id)
                    if (classTypeIds.map(id => id.toString()).includes(classType._id.toString())) {
                        // console.log("Includes: ",classTypeIds ," : " ,classType._id)
                        // console.log(group.shortName,room.name,teacher.username,classType.name,_id, group._id)
                        const obj = {
                            groupName: group.shortName,
                            room: room.name,
                            teacher: teacher.username,
                            classType: classType.name,
                            lessonScheduleId: _id,
                            groupId: group._id,
                            onOddWeek: lesson.onOddWeek,
                            onEvenWeek: lesson.onEvenWeek
                        };
    
                        if (!schedule[dayOfWeek]) {
                            schedule[dayOfWeek] = {};
                        }
    
                        if (schedule[dayOfWeek][timeSlot]) {
                            schedule[dayOfWeek][timeSlot].push(obj);
                        } else {
                            schedule[dayOfWeek][timeSlot] = [obj];
                        }
                    }
                });
            });
        }

        

        

        // Iterate over groups and their lesson schedules
        

        return schedule;
    } catch (error) {
        console.error('Error fetching class schedule:', error);
        return null;
    }
}



// async function getClassSchedule(courseId) {
//     try {
//         // Find the class type with the provided course ID
//         const classType = await ClassTypes.findOne({ course: courseId });

//         if (!classType) {
//             console.error('Class type not found for the provided course ID');
//             return null;
//         }

//         // Get the ID of the found class type
//         const classTypeId = classType._id;

//         // Fetch all groups and populate the lesson schedules
//         const groups = await Group.find({})
//             .populate('lessonSchedule.teacher')
//             .populate('lessonSchedule.room')
//             .populate('lessonSchedule.classType');

//         // Initialize the schedule object
//         const schedule = {};
//         Object.values(availableWeekDays).map(v => schedule[v] = {});

//         // Iterate over groups and their lesson schedules
//         groups.forEach(group => {
//             group.lessonSchedule.forEach(lesson => {
//                 const { dayOfWeek, timeSlot, teacher, room, classType, _id } = lesson;

//                 // Check if the lesson's class type ID matches the found class type ID
//                 if (classType._id.toString() === classTypeId.toString()) {
//                     const obj = {
//                         groupName: group.shortName,
//                         room: room.name,
//                         teacher: teacher.username,
//                         classType: classType.name,
//                         lessonScheduleId: _id,
//                         groupId: group._id,
//                         onOddWeek: lesson.onOddWeek,
//                         onEvenWeek: lesson.onEvenWeek
//                     };

//                     if (!schedule[dayOfWeek]) {
//                         schedule[dayOfWeek] = {};
//                     }

//                     if (schedule[dayOfWeek][timeSlot]) {
//                         schedule[dayOfWeek][timeSlot].push(obj);
//                     } else {
//                         schedule[dayOfWeek][timeSlot] = [obj];
//                     }
//                 }
//             });
//         });

//         return schedule;
//     } catch (error) {
//         console.error('Error fetching class schedule:', error);
//         return null;
//     }
// }






// async function getClassSchedule() {
//     try {
//         const groups = await Group.find({})
//             .populate('lessonSchedule.teacher')
//             .populate('lessonSchedule.room')
//             .populate('lessonSchedule.classType')
//         const schedule = {};

//         Object.values(availableWeekDays).map(v => schedule[v] = {});

//         groups.forEach(group => {
//             group.lessonSchedule.forEach(lesson => {
//                 const { dayOfWeek, timeSlot, teacher, room, classType, _id } = lesson; //course
//                 // console.log(classType)
//                 const obj = {
//                     groupName: group.shortName,
//                     room: room.name,
//                     teacher: teacher.username,
//                     // course: course.username,
//                     classType: classType.name,
//                     lessonScheduleId: _id,
//                     groupId: group._id,
//                     onOddWeek: lesson.onOddWeek,
//                     onEvenWeek: lesson.onEvenWeek
//                     // timeSlot,
//                     // students: studentNames,
//                 };

//                 // Check if schedule[dayOfWeek] is defined, initialize it if not
//                 if (!schedule[dayOfWeek]) {
//                     schedule[dayOfWeek] = {};
//                 }

//                 if (schedule[dayOfWeek][timeSlot]) {
//                     schedule[dayOfWeek][timeSlot].push(obj)
//                 } else {
//                     schedule[dayOfWeek][timeSlot]= [obj]
//                 }
//             });
//         });
//         return schedule;
//     } catch (error) {
//         console.error('Error fetching class schedule:', error);
//         return null;
//     }
// }

const getClassCreateParams = async() => {
    const room = await Room.find().populate();
    // console.log(room)
    const classTypes = await ClassTypes.find().populate();
    const group = await Group.find().populate();
    const courses = await Course.find().populate();
    const roles = await Role.find({});
    const rolesObj = {};
    roles.map(i => {rolesObj[i.name] = i.id})
    const coursesObj = {};
    courses.map(j => {coursesObj[j.name] = j.id});
    const teachers = await User.find({ role: rolesObj[ROLES.TEACHER], username: { $ne: 'fakeuser' } })
        .populate();

    const uniqueClassTypeNames = [...new Set(classTypes.map(type => type.name))];
    // console.log("AAAAAAA: ", uniqueClassTypeNames)

    return {
        group: group.map(i => {
            return {value: i._id, label: i.name}
        }),
        teacher: teachers.map(i => {
            return {value: i._id, label: i.username}
        }),
        course: courses.map(i => {
            return {value: i._id, label: i.name}
        }),
        room: room.map(i => {
            return {value: i._id, label: i.name}
        }),
        classType: uniqueClassTypeNames.map(name => {
            return {value: name, label: name }
        }),
        // classType: classTypes.map(i => {
        //     return {value: i._id, label: i.name}
        // }),
        timeSlot: availableTimeslots.map(i => {
            return {value: i, label: i}
        }),
        dayOfWeek: Object.values(availableWeekDays).map(i => {
            return {value: i, label: i}
        })
    }
}

module.exports = { getClassSchedule, getClassCreateParams };
