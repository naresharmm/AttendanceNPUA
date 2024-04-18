const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const Course = require("./models/Course");
const Role = require("./models/Role");
const {COURSES} = require("./models/User");
const {ROLES, attendanceStatus} = require("./models/User");

// const generateMockData = require('./fakeClass');

// const uri = 'mongodb://localhost:27017/mydba';

// Sample fake user data
const faketestStudent = {
    username: 'faketestStudent',
    email:'faketestStudent@gmail.com',
    password: 'fakepassword',
 };
// const fakeAdmin = {
//     username: 'fakeadmin',
//     email:'fakeAdmin@gmail.com',
//     password: 'fakepassword',
//  };
// const fakeTeacher = {
//     name: 'fakeTeacher',
//     email:'faketeacher@gmail.com',
//     password: 'fakepassword',
//  };
// const fakeStudent = {
//     name: 'fakeStudent',
//     email:'fakestudent@gmail.com',
//     password: 'fakepassword',
//  };



async function createFakeUser() {
    try {
                //  await mongoose.connect(uri);


                 const roles = await Role.find({});
                 const rolesObj = {};
                 roles.map(i => {rolesObj[i.name] = i.id})
        

        // const [course019, course055] = await Promise.all([
        //     Course.create({ name: '019' }),
        //     Course.create({ name: '055' })
        // ]);
                const courses = await Course.find({});
                const coursesObj = {};
                courses.map(j => {coursesObj[j.name] = j.id});
                
                // console.log(coursesObj['019']);
                const faketestStudentwithRole = { ...faketestStudent, role: rolesObj[ROLES.ADMIN], course: coursesObj['019']};
        // const fakeSuperAdminWithRole = { ...fakeSuperAdmin, role: superadminRole._id };
        // const fakeAdminWithRole = { ...fakeAdmin, role: adminRole._id };
        // const fakeTeacherWithRole = { ...fakeTeacher, role: teacherRole._id };
        // const fakeStudentWithRole = { ...fakeStudent, role: studentRole._id };

                const [testuser] = await Promise.all([
                    User.create(faketestStudentwithRole)
                ]);

        // await generateMockData();

             console.log(`Fake user inserted with _id: ${testuser._id}`);
    } catch (error) {
        console.error('Error creating fake user:', error);
    } finally {
        // mongoose.connection.close();
    }
}

createFakeUser();