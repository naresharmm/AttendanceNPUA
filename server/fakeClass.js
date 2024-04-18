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

        // const roles = await Role.find({});
        // const rolesObj = {};
        // roles.map(i => {rolesObj[i.name] = i.id})

        // const courses = await Course.find({});
        // const coursesObj = {};
        // courses.map(j => {coursesObj[j.name] = j.id});
        // Create rooms
        

        // Create teachers
        // const teachersArr = [
        //     { username: 'Մկրտչյան Գ.', email: 'poghosyanirina_admin@polytechnic.am', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Ամիրբեկյան Ն.', email: 'shahbazyannara_admin@polytechnic.am', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Ուսեպյան Մ.', email: 'manukyanarmine_admin@polytechnic.am3', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Հովհաննիսյան Է.', email: 'test@polytechnic.am4', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Համբարձումյան Ք.', email: 'test@polytechnic.am5', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Հարությունյան Լ.', email: 'test@polytechnic.am6', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Գանովիչ Տ.', email: 'test@polytechnic.am7', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Տոմեյան Գ.', email: 'test@polytechnic.am8', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Խեմչյան Ա.', email: 'test@polytechnic.am9', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Օբոյանցև Վ.', email: 'test@polytechnic.am10', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Մանուկյան Ա.', email: 'test@polytechnic.am11', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Մարկոսյան Մ.', email: 'test@polytechnic.am12', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Սարգսյան Ս.', email: 'test@polytechnic.am13', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Ղազարյան Մ.', email: 'test@polytechnic.am14', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Մանուկյան Մ.', email: 'animanukyan_prof@polytechnic.am', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Հարությունյան Լ.', email: 'harutyunyanlevon_prof@polytechnic.am', role: rolesObj[ROLES.TEACHER], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        // ];

        // const teachers = await User.insertMany(teachersArr);

        // Create students
        // const studentsArr = [
        //     { username: 'Կիրակոսյան Հայկ Սամվելի', email: 'kirakosyan_hayk019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Պետրոսյան Նարեկ Խաչատուրի', email: 'petrosyan_narek019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Մանուկյան Անի Վահանի', email: 'manukyan_ani019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Գրիգորյան Ստեփան Մարտինի', email: 'girgoryan_stepan019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Մուրադյան Միասնիկ Մուրադի', email: 'muradyan_misnik019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Հարությունյան Աննա Վահագնի', email: 'harutyunyan_anna019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Բարսեղյան Սյունե Ժիրայրի', email: 'barsexyan_suren019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Խեչոյան Ադրինե Մհերի', email: 'xechoyan_adrine019@polytechnic.am', role: rolesObj[ROLES.STUDENT],course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Ավետիսյան Մհեր Ենոքի', email: 'avetisyan_mher019@polytechnic.am', role: rolesObj[ROLES.STUDENT],course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Գաբրիելյան Հմայակ Անդրանիկի', email: 'gabrielyan_hmayak019@polytechnic.am', role: rolesObj[ROLES.STUDENT],course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Հայրապետյան Մնացական Համբարձումի', email: 'hayrapetyan_mnacakan019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Առաքելյան Վիլյամ Սուրենի', email: 'araqelyan_vilyam019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Խաչատրյան Աննա Գևորգի', email: 'xachatryan_anna019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Մարգարյան Գևորգ Հայկի', email: 'margaryan_gevorg019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Մուրադյան Արշակ Հովհաննեսի', email: 'muradyan_arshak019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['055'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Մարգարյան Դավիթ Պարույրի', email: 'margaryan_davit019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['055'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Պողոսյան Գոհար Համլետի', email: 'poxosyan_gohar019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['055'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Սաֆարյան Արտակ Սուրենի', email: 'safaryan_artak019@polytechnic.am', role: rolesObj[ROLES.STUDENT],course: coursesObj['055'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Ալեքսանյան Նարեկ Արթուրի',  email: 'aleqsanyan_narek19@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Առաքելյան Անի Վահրամի', email: 'araqelyan_ani019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Բաղդասարյան Մարիա Արտյոﬕ', email: 'barsexyan_mariam019@polytechnic.am', role: rolesObj[ROLES.STUDENT],course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Գրիգորյան Աննա Արտաշեսի', email: 'grigoryan_annd019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Լևոնյան Թերեզա Արծրունի', email: 'levonyan_tereza019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Խանգելդյան Ստեֆանիա Գուրգենի', email: 'xangeldyan_stefania019@polytechnic.am', role: rolesObj[ROLES.STUDENT],course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Կիրակոսյան Մերի Ահարոնի', email: 'kisakosyan_mery019@polytechnic.am', role: rolesObj[ROLES.STUDENT],course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Կոստանյան Անահիտ Արսենի', email: 'kostanyan_anahit019@polytechnic.am', role: rolesObj[ROLES.STUDENT],course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Հակոբյան Լիանա Հենզելի', email: 'hakobyan_liana019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Հովակիմյան Լուսինե Կարենի', email: 'hovakimyan_lusine019@polytechnic.am', role: rolesObj[ROLES.STUDENT],  course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Մելիքյան Յուրի Արտավազդի', email: 'meliqyan_yuri019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'],  password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Նազարեթյան Սաթենիկ Վահանի', email: 'nazaretyan_satenik019@polytechnic.am', role: rolesObj[ROLES.STUDENT],  course: coursesObj['019'],password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Սահակյան Լուսինե Գնելի', email: 'sahakyan_lusine019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'] ,password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Վարդանյան Տաթև Գեղամի', email: 'vardanyan_tatev019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'], password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        //     { username: 'Վարդանյան Նարեկ Հրանտի', email: 'vardanyan_narek019@polytechnic.am', role: rolesObj[ROLES.STUDENT], course: coursesObj['019'] ,password: '$2b$10$IL6RvEYBOKmDTxJg.yBOae6EHKV762b4R7pXdpwi55Rru7oT94Uq6' },
        // ];

        // const students = await User.insertMany(studentsArr);


        // async function assignStudentsToClassTypes(students, courses) {
        //     let classTypes = [];
        //     for (const course of courses) {
        //         const studentsForCourse = students.filter(student => student.course.toString() === course._id.toString());
        //         const len = studentsForCourse.length;
        //         const groupSize = Math.ceil(len / 4);
        //         const studentsGroupIds = {
        //             1: studentsForCourse.slice(0, groupSize).map(s => s._id),
        //             2: studentsForCourse.slice(groupSize, 2*groupSize).map(s => s._id),
        //             3: studentsForCourse.slice(2*groupSize, 3*groupSize).map(s => s._id),
        //             4: studentsForCourse.slice(3*groupSize).map(s => s._id),
        //         };
        //         const courseClassTypes = [
        //             { name: `Լաբ. 1 `, students: studentsGroupIds[1], course: course._id },
        //             { name: `Լաբ. 2 `, students: studentsGroupIds[2] , course: course._id},
        //             { name: `Լաբ. 3 `, students: studentsGroupIds[3] , course: course._id},
        //             { name: `Լաբ. 4 `, students: studentsGroupIds[4] , course: course._id},
        //             { name: `Դաս. `, students: studentsForCourse.map(s => s._id), course: course._id },
        //             { name: `Գործ. 1 `, students: [...studentsGroupIds[1],...studentsGroupIds[2]], course: course._id },
        //             { name: `Գործ. 2 `, students: [...studentsGroupIds[3],...studentsGroupIds[4]], course: course._id },
        //             { name: `ԿԱ 1 `, students: [...studentsGroupIds[1],...studentsGroupIds[2]], course: course._id },
        //             { name: `ԿԱ 2 `, students: [...studentsGroupIds[3],...studentsGroupIds[4]] , course: course._id}
        //             // Add more class types if needed
        //         ];
        //         classTypes.push(...courseClassTypes);
        //     }
        //     return classTypes;
        // }
        
        // Usage example
            // async function createUserAndAssignToClassTypes(userData) {
                    // Create new user
                    // const newUser = await User.create(userData);
                
                    // Fetch all students and courses
                    // const students = await User.find({});
                    // const courses = await Course.find({});
                
                    // Now you can update class types for each course
                    // const classTypes = await ClassType.create(await assignStudentsToClassTypes(students, courses));
                    // console.log(classTypes)
                    // console.log(courses)
                    // return classTypes;
            // }







                    // async function assignStudentsToClassTypes(students, courses) {
                    //     let classTypes = [];
                    //     for (const course of courses) {
                    //         const studentsForCourse = students.filter(student => student.course.toString() === course._id.toString());
                    //         const studentsGroupIds = {
                    //             1: studentsForCourse.slice(0, 9).map(s => s._id),
                    //             2: studentsForCourse.slice(9, 17).map(s => s._id),
                    //             3: studentsForCourse.slice(17, 25).map(s => s._id),
                    //             4: studentsForCourse.slice(25).map(s => s._id),
                    //         };
                    //         const courseClassTypes = [
                    //             { name: `Լաբ. 1 (${course.name})`, students: studentsGroupIds[1] },
                    //             { name: `Լաբ. 2 (${course.name})`, students: studentsGroupIds[2] },
                    //             { name: `Լաբ. 3 (${course.name})`, students: studentsGroupIds[3] },
                    //             { name: `Լաբ. 4 (${course.name})`, students: studentsGroupIds[4] },
                    //             { name: `Դաս. (${course.name})`, students: studentsForCourse.map(s => s._id) },
                    //             { name: `Գործ. 1 (${course.name})`, students: [...studentsGroupIds[1],...studentsGroupIds[2]] },
                    //             { name: `Գործ. 2 (${course.name})`, students: [...studentsGroupIds[3],...studentsGroupIds[4]] },
                    //             { name: `ԿԱ 1 (${course.name})`, students: [...studentsGroupIds[1],...studentsGroupIds[2]] },
                    //             { name: `ԿԱ 2 (${course.name})`, students: [...studentsGroupIds[3],...studentsGroupIds[4]] }
                    //             // Add more class types if needed
                    //         ];
                    //         classTypes.push(...courseClassTypes);
                    //     }
                    //     return classTypes;
                    // }
        
        // Usage example
                    // const newUser = await User.create({ /* user data */ });
        
        // Fetch all students and courses
        // const students = await User.find({});
        // const courses = await Course.find({});
        
        // Now you can update class types for each course
            // const classTypes = await ClassType.create(await assignStudentsToClassTypes(students, courses));
            // console.log(classTypes)
            // console.log(courses)




















        // const studentsGroupIds = {
        //     1: students.slice(0, 9).map(s => s._id),
        //     2: students.slice(9, 17).map(s => s._id),
        //     3: students.slice(17, 25).map(s => s._id),
        //     4: students.slice(25).map(s => s._id),
        // }

        // const classTypes = await ClassType.create([
        //     { name: 'Լաբ. 1', students: studentsGroupIds[1]},
        //     { name: 'Լաբ. 2', students: studentsGroupIds[2]},
        //     { name: 'Լաբ. 3', students: studentsGroupIds[3]},
        //     { name: 'Լաբ. 4', students: studentsGroupIds[4]},
        //     { name: 'Դաս.', students: [...studentsGroupIds[1], ...studentsGroupIds[2], ...studentsGroupIds[3], ...studentsGroupIds[4]]},
        //     { name: 'Գործ. 1', students: [...studentsGroupIds[1], ...studentsGroupIds[2]]},
        //     { name: 'Գործ. 2', students: [...studentsGroupIds[3], ...studentsGroupIds[4]]},
        //     { name: 'ԿԱ 1', students: [...studentsGroupIds[1], ...studentsGroupIds[2]]},
        //     { name: 'ԿԱ 2', students: [...studentsGroupIds[3], ...studentsGroupIds[4]]},
        // ])

        // Create groups
        // const groups = await Group.create([
        //     {
        //         name: 'օպերացիոն համակարգեր',
        //         shortName: 'ՕՀ',
        //         lessonSchedule: [
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[0], teacher: [teachers[0]._id], room: rooms[0]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[0]._id], room: rooms[1]._id, classType: classTypes[0]._id, students: classTypes[0].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[1]._id], room: rooms[4]._id, classType: classTypes[1]._id, students: classTypes[1].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[3], teacher: [teachers[1]._id], room: rooms[5]._id, classType: classTypes[3]._id, students: classTypes[3].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[0], teacher: [teachers[0]._id], room: rooms[3]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
        //         ],
        //     },
        //     {
        //         name: 'քոմփյութերային ցանցերի ծրագրավորում',
        //         shortName: 'ՔՑԾ',
        //         lessonSchedule: [
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[0], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[1]._id, students: classTypes[1].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[3]._id, students: classTypes[3].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[3], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[0]._id, students: classTypes[0].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[1], teacher: [teachers[11]._id], room: rooms[3]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[3], teacher: [teachers[9]._id], room: rooms[4]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: true },
        //         ],
        //     },
        //     {
        //         name: 'օբյեկտ կողմնորոշված ծրագրավորում',
        //         shortName: 'ՕԿԾ',
        //         lessonSchedule: [ 
        //             { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: false },
        //             { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[0]._id, students: classTypes[0].students, onOddWeek: false, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[3]._id, students: classTypes[3].students, onOddWeek: true, onEvenWeek: false },
        //             { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[0], teacher: [teachers[4]._id], room: rooms[8]._id, classType: classTypes[1]._id, students: classTypes[1].students, onOddWeek: false, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[1], teacher: [teachers[4]._id], room: rooms[9]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
        //         ],
        //     },
        //     {
        //         name: 'ծրագրերի թեստավորում',
        //         shortName: 'ԾԹ',
        //         lessonSchedule: [
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[0], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[0]._id, students: classTypes[0].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[1], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[2], teacher: [teachers[2]._id], room: rooms[3]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.monday, timeSlot: availableTimeslots[3], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[1]._id, students: classTypes[1].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.wednesday, timeSlot: availableTimeslots[2], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[2]._id, students: classTypes[2].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[0], teacher: [teachers[2]._id], room: rooms[2]._id, classType: classTypes[3]._id, students: classTypes[3].students, onOddWeek: true, onEvenWeek: true },
        //         ],
        //     },
        //     {
        //         name: 'ՔՊ և ԱԻՀ',
        //         shortName: 'ՔՊ և ԱԻՀ',
        //         lessonSchedule: [
        //             { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[0], teacher: [teachers[12]._id], room: rooms[7]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: false },
        //             { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[0], teacher: [teachers[12]._id], room: rooms[7]._id, classType: classTypes[6]._id, students: classTypes[6].students, onOddWeek: false, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[12]._id], room: rooms[11]._id, classType: classTypes[5]._id, students: classTypes[5].students, onOddWeek: false, onEvenWeek: true },
        //         ],
        //     },
        //     {
        //         name: 'ԾՏ',
        //         shortName: 'ԾՏ',
        //         lessonSchedule: [
        //             { dayOfWeek: availableWeekDays.tuesday, timeSlot: availableTimeslots[1], teacher: [teachers[6]._id], room: rooms[6]._id, classType: classTypes[8]._id, students: classTypes[8].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.thursday, timeSlot: availableTimeslots[1], teacher: [teachers[6]._id], room: rooms[6]._id, classType: classTypes[7]._id, students: classTypes[7].students, onOddWeek: true, onEvenWeek: true },
        //         ],
        //     },
        //     {
        //         name: 'ճյուղի տնտես',
        //         shortName: 'ճյուղի տնտես',
        //         lessonSchedule: [
        //             { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[2], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[4]._id, students: classTypes[4].students, onOddWeek: true, onEvenWeek: true },
        //             { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[5]._id, students: classTypes[5].students, onOddWeek: true, onEvenWeek: false },
        //             { dayOfWeek: availableWeekDays.friday, timeSlot: availableTimeslots[3], teacher: [teachers[13]._id], room: rooms[10]._id, classType: classTypes[6]._id, students: classTypes[6].students, onOddWeek: false, onEvenWeek: true },
        //         ],
        //     },
        // ]);

        // for (const group of groups) {
        //     for (const lesson of group.lessonSchedule) {
        //         const exactClassType = classTypes.find(classType => {
        //             const cond = lesson.classType === classType._id
        //             if (cond) {
        //                 // console.log(cond)
        //             }
        //             return cond
        //         });

        //         for(const student of exactClassType.students) {
        //             const user = await User.findById(student._id);

        //             if (user?.lessons?.length) {
        //                 user.lessons.push(lesson._id);
        //             } else {
        //                 user.lessons = [lesson._id]
        //             }

        //             await user.save()
        //         }
        //     }
        // }
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
                            date: moment().day(toMomentWeekDays[lesson.dayOfWeek]).week(m.week()).format('DD-MM-YYYY'),
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


module.exports = generateMockData;