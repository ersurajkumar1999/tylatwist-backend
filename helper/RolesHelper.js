// Define roles as constants

const ADMIN = "ADMIN";
const MANAGER = "MANAGER";
const USER = "USER";
const EMPLOYEE = "EMPLOYEE";

const ROLES = {
    ADMIN,
    MANAGER,
    USER,
    EMPLOYEE
};

// Function to get all roles
const getAllRoles = () => {
    return Object.values(ROLES);
};

// Function to check if a role is valid
const isValidRole = (role) => {
    return Object.values(ROLES).includes(role);
};

module.exports = {
    ROLES,
    getAllRoles,
    isValidRole,
};
