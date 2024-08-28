import mongoose from "mongoose";
import { ROLES } from "../helper/Constants.js";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    isEmailVerified: {
        type: Date,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ROLES, // Using roles from the helper file
        default: ROLES[0], // Default role as 'User'
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    language: {
        type: String,
        required: true,
        default: 'en', // Default language is English
    },
    otp: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true,
    },
    deletedAt: { type: Date, default: null },
    isOnline: {
        type: Boolean,
        default: false,
    },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    token: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
