const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const File = require("../models/File");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

// Endpoint to retrieve information about files including user details and file URL directory with pagination
router.get('/', verifyToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const filesPromise = File.find({})
            .populate({
                path: 'userId',
                model: 'User',
                select: 'username email'
            })
            .skip(skip)
            .limit(limit);

        const totalFilesPromise = File.countDocuments();

        const [files, totalFiles] = await Promise.all([filesPromise, totalFilesPromise]);

        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'Files not found' });
        }

        const totalPages = Math.ceil(totalFiles / limit);

        const responseObject = files.map(file => {
            const fileUrlDirectory = `http://192.168.10.10.23/uploads/${file.path}`;
            return {
                file: {
                    filename: file.filename,
                    path: file.path,
                    size: file.size,
                    textData: file.textData,
                    createdAt: file.createdAt,
                    fileUrlDirectory: fileUrlDirectory
                },
                user: {
                    username: file.userId.username,
                    email: file.userId.email
                }
            };
        });

        const paginationInfo = {
            totalPages: totalPages,
            currentPage: page,
            totalFiles: totalFiles
        };

        res.json({ files: responseObject, pagination: paginationInfo });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve file information' });
    }
});

module.exports = router;
