const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require("path");
const fs = require("fs");
const jwt = require('jsonwebtoken');

const File = require("../models/File");



const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

router.post('/file', upload.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
        const token = req.headers['authorization'];
         if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

         const decoded = jwt.verify(token, 'secret'); // Replace 'secret' with your actual secret key

         const userId = decoded.userId;

        const newFile = new File({
            filename: file.originalname,
            path: file.path,
            size: file.size,
            textData: req.body.textData,
            userId: userId
        });

         await newFile.save();

         res.json({ filename: file.originalname, path: file.path });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            console.error(err);
            return res.status(500).json({ message: 'Failed to save file' });
        }
    }

});

module.exports = router;
