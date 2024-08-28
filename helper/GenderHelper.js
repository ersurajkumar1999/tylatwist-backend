// Define the allowed genders
const GENDERS = ["Male", "Female", "Other"];

// Function to get all genders
const getAllGenders = () => {
    return Object.values(GENDERS);
};

// Function to check if a gender is valid
const isValidGender = (gender) => {
    return Object.values(GENDERS).includes(gender);
};

module.exports = {
    GENDERS,
    getAllGenders,
    isValidGender,
};