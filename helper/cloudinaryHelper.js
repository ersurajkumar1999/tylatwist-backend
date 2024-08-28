const { cloudinary } = require("../config");

const uploadToCloudinary1 = (fileBuffer, fileName, folderName) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'screenshots',
                folder: folderName,
                public_id: fileName,
                format: 'png' // or jpg, etc.
            },
            (error, result) => {
                console.log("error", error);
                console.log("result", result);
                if (error) return reject(error);
                resolve(result);
            }
        ).end(fileBuffer);
    });
};

// module.exports = { uploadToCloudinary };
const uploadToCloudinary = (fileBuffer, fileName, folderName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'image', // Ensure correct resource type
                folder: folderName,
                public_id: fileName,
                format: 'png' // or jpg, etc.
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                console.log('Cloudinary upload result:', result); // Log Cloudinary result
                resolve(result);
            }
        );

        stream.end(fileBuffer);
    });
};

module.exports = { uploadToCloudinary };