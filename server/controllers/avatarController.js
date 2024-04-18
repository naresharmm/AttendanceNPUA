const express = require('express');
const multer = require('multer');
const router = express.Router();

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars'); // Set the destination folder for avatar uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Set the filename to the original filename
    }
});

const upload = multer({ storage: storage });

// Handle avatar upload endpoint
router.post('/upload-avatar', upload.single('avatar'), (req, res) => {
    const username = req.body.username;
    const avatarPath = req.file.path;

    // Process the uploaded avatar and username as needed
    // For example, save the avatarPath and username to the database

    res.status(200).json({ message: 'Avatar uploaded successfully' });
});

module.exports = router;
