import validator from 'validator';
import { errorResponseMessage } from "../helper/responseMessage.js";

// Regular expression for names allowing alphabetic characters, spaces, and hyphens
const nameRegular = /^[a-zA-Z\s\-]+$/;

export const validateFirstName = async (res, data) => {
    if (validator.isEmpty(data)) {
        return errorResponseMessage(res, "First Name field is required.");
    } else if (data.length < 3) {
        return errorResponseMessage(res, "First Name must contain only alphabetic characters, spaces, or hyphens.");
    } else if (!nameRegular.test(data)) {
        return errorResponseMessage(res, "First Name must be at least 3 characters long.");
    }
    return true;
};

export const validateLastName = async (res, data) => {
    if (validator.isEmpty(data)) {
        return errorResponseMessage(res, "Last Name field is required.");
    } else if (!nameRegular.test(data)) {
        return errorResponseMessage(res, "Last Name must contain only alphabetic characters, spaces, or hyphens.");
    } else if (data.length < 3) {
        return errorResponseMessage(res, "Last Name must be at least 3 characters long.");
    }
    return true;
};

export const validateEmail = async (res, data) => {
    if (validator.isEmpty(data)) {
        return errorResponseMessage(res, "Email field is required.");
    } else if (!validator.isEmail(data)) {
        return errorResponseMessage(res, "Invalid email address.");
    }
    return true;
};

export const validatePassword = async (res, data) => {
    if (validator.isEmpty(data)) {
        return errorResponseMessage(res, "Password field is required.");
    } else if (data.length < 6) {
        return errorResponseMessage(res, "Password needs to be at least 6 characters long.");
    }
    return true;
};
