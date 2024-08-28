import jwt from "jsonwebtoken"
import {verify} from "../config/verify-token.js";
import { errorResponseMessage } from "../helper/responseMessage.js";

export const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return errorResponseMessage(res, "No token provided", 401);
    }
    try {
        try {
            let decode = jwt.verify(verify(req), process.env.JWT_SECRET);
            if (!decode) {
                return errorResponseMessage(res, "Wrong token", 401);
            }
            req.user = decode
            next();
        } catch (error) {
            console.log("error===>", error);
            return errorResponseMessage(res, "Token is missing", 401);
        }
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong while validating the token", 401);
    }
}

export const isUser = async (req, res, next) => {
    try {
        if (req.user.userType !== "User") {
            return errorResponseMessage(res, "This is a protected route for User only", 401);
        }
    } catch (error) {
        return errorResponseMessage(res, "User role cannot be verified, try again", 401);
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.userType !== "Admin") {
            return errorResponseMessage(res, "This is a protected route for Admin only", 401);
        }
        next();
    } catch (error) {
        return errorResponseMessage(res, "User role cannot be verified, try again", 401);
    }
}