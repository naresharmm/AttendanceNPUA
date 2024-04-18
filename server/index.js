const express = require("express");
const app = express();
const cors = require('cors');
require('./firstsetup.js');
// require('./faketest');
// require('./fakeClass')
// require('./fakeAttendenceList')
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8080;

require('./db');

const classController = require('./controllers/classController');
const qrController = require('./controllers/QRController');
const loginController = require('./controllers/LoginController');
const uploadController = require('./controllers/UploadFileController');
const classRoutes = require('./routs/classRoutes');
const attendanceController = require('./controllers/attendanceController');
const studentsController = require('./controllers/studentsController');
const messagesController = require('./controllers/messagesController');
const userController = require('./controllers/userController');
const courseController = require('./controllers/courseController');
const roleController = require('./controllers/roleController');
const adminController = require('./controllers/adminController');
const admincreateuserController = require('./controllers/admincreateuserController');
const admincreategroupController = require('./controllers/admincreategroupController');
const admincreateobjectController = require('./controllers/admincreateobjectController');
const changemypasswordController = require('./controllers/changemypasswordController');
const admindeletestudentController = require('./controllers/admindeletestudentController');

const path = require("path");

app.use('/qr', qrController);
app.use('/', classController);

app.use('/test', classRoutes);

app.use('/upload',uploadController);
app.use('/messages',messagesController);
app.use('/admincreateuser', admincreateuserController);
app.use('/admincreategroup', admincreategroupController);
app.use('/admincreateobject', admincreateobjectController);
app.post('/login', loginController);
app.use('/attendance', attendanceController);
app.use('/students', studentsController);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin',adminController);
app.use('/user',userController);
app.use('/course',courseController);
app.use('/role',roleController);
app.use('/changemypassword',changemypasswordController);
app.use('/deletestudent',admindeletestudentController);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});