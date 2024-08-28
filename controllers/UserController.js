
import { comparePassword, hashedPassword } from '../helper/PasswordManager.js';
import { errorResponseMessage, successResponseMessage } from '../helper/responseMessage.js';
import { updateUserProfile } from '../services/profileServices.js';
import { totalUsers, getUsers, findUserByEmail, findUserByUserName, findUserById, updateUserByID } from '../services/userServices.js';
import validator from 'validator';
import Like from '../models/Like.js';
import Comment from "../models/Comment.js";
import Image from "../models/Image.js"

export const userList = async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 10;

    const skip = (page - 1) * pageSize;

    try {
        const { filter } = req.body;

        const totalItems = await totalUsers();
        const users = await getUsers(skip, pageSize);
        res.json({
            data: users,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: filter
        });
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

export const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
        const checkUserExistsByEmail = await findUserByEmail(email);
        if (checkUserExistsByEmail) {
            return errorResponseMessage(res, "User email already exists");
        }
        return successResponseMessage(res, "Email is Available!");
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
export const checkUserName = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username || username.length < 3) {
            return errorResponseMessage(res, "username needs to be atleast 3 characters long.");
        }
        const checkUserExistsByUserName = await findUserByUserName(username);
        if (checkUserExistsByUserName) {
            return errorResponseMessage(res, "User UserName already exists");
        }
        return successResponseMessage(res, "UserName is Available!");
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
