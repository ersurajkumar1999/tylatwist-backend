// Function to check if file type is allowed
const allowedTypes = ['image/jpeg', 'image/png']; // Add more types if needed

const checkImageType = (mimetype) => {
    return allowedTypes.includes(mimetype);
};

module.exports = { checkImageType }
