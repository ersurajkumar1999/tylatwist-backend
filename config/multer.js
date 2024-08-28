const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 30, // 30MB limit (adjust as needed)
    },
});

module.exports = { upload };
