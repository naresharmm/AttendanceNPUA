const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
 const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const Role = require("./models/Role");
const Course = require("./models/Course");

const Room = require('./models/Room');

// const generateMockData = require('./fakeClass');

// require()


// const uri = 'mongodb://localhost:27017/mydba';

// Sample fake user data
const fakeSuperAdmin = {
    username: 'Super Admin',
    email:'super_admin@polytechnica.am',
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

async function findOrCreateRole(name) {
    let role = await Role.findOne({ name  });
    if (!role) {
        role = await Role.create({ name });
    }
    return role;
}

async function findOrCreateRoom(name) {
    let room = await Room.findOne({ name });
    if (!room) {
        room = await Room.create({ name });
    }
    return room;
}

async function findOrCreateUser(email, userData) {
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create(userData);
    }
    return user;
}



async function createFakeUser() {
    try {
        //  await mongoose.connect(uri);
        const [superadminRole, adminRole, teacherRole, studentRole] = await Promise.all([
            findOrCreateRole('SuperAdmin'),
            findOrCreateRole('Admin'),
            findOrCreateRole('Teacher'),
            findOrCreateRole('Student')
        ]);
        
        const rooms = await Promise.all([
            findOrCreateRoom('5214'),
            findOrCreateRoom('5104'),
            findOrCreateRoom('5310'),
            findOrCreateRoom('5211'),
            findOrCreateRoom('5218'),
            findOrCreateRoom('5220'),
            findOrCreateRoom('5207ա'),
            findOrCreateRoom('2129'),
            findOrCreateRoom('5306'),
            findOrCreateRoom('5307'),
            findOrCreateRoom('9717'),
            findOrCreateRoom('2438')
        ]);
                        // const [superadminRole,adminRole, teacherRole, studentRole] = await Promise.all([
                        //     Role.create({ name: 'SuperAdmin' }),
                        //     Role.create({ name: 'Admin' }),
                        //     Role.create({ name: 'Teacher' }),
                        //     Role.create({ name: 'Student' })
                        // ]);
                        // const rooms = await Room.create([
                        //     { name: '5214' },
                        //     { name: '5104' },
                        //     { name: '5310' },
                        //     { name: '5211' },
                        //     { name: '5218' },
                        //     { name: '5220' },
                        //     { name: '5207ա' },
                        //     { name: '2129' },
                        //     { name: '5306' },
                        //     { name: '5307' },
                        //     { name: '9717' },
                        //     { name: '2438' },
                        // ]);

        // const [course019, course055] = await Promise.all([
        //     Course.create({ name: '019' }),
        //     Course.create({ name: '055' })
        // ]);



        const fakeSuperAdminWithRole = { ...fakeSuperAdmin, role: superadminRole._id };
        // const fakeAdminWithRole = { ...fakeAdmin, role: adminRole._id };
        // const fakeTeacherWithRole = { ...fakeTeacher, role: teacherRole._id };
        // const fakeStudentWithRole = { ...fakeStudent, role: studentRole._id };
                            
        console.log(fakeSuperAdmin.email,fakeSuperAdminWithRole )
        const [superadmin] = await Promise.all([
            findOrCreateUser(fakeSuperAdmin.email, fakeSuperAdminWithRole)
        ]);
                            // const [superadmin,admin, teacher, student] = await Promise.all([
                            //     User.create(fakeSuperAdminWithRole),
                            //     // User.create(fakeAdminWithRole),
                            //     // User.create(fakeTeacherWithRole),
                            //     // User.create(fakeStudentWithRole)
                            // ]);
        if (superadmin) {
            console.log("Superadmin created successfully or already existed.");
            // If superadmin was created, superadmin[0] will hold the user object
            // If superadmin already existed, superadmin[0] will hold the existing user object
        } else {
            console.log("Failed to create superadmin.");
        }
        // await generateMockData();

                    // console.log(`Fake user inserted with _id: ${admin._id}`);
    } catch (error) {
        console.error('Error creating fake user:', error);
    } 
    // finally {
    //     mongoose.connection.close();
    // }
}

createFakeUser();