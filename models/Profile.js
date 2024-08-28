import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: null
    },
    lastName: {
        type: String,
        trim: true,
        default: null
    },
    slug: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        enum: ["MALE"], // Specify the enum here
        default: null
    },
    dateOfBirth: {
        type: String,
        trim: true,
        default: null
    },
    about: {
        type: String,
        trim: true,
        default: null
    },
    contactNumber: {
        type: Number,
        trim: true,
        default: null
    },
    isNumberVerified: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        trim: true,
        default: null
    },
    bioImage: {
        type: String,
        trim: true,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    state: {
        type: String,
        trim: true,
        default: null
    },
    city: {
        type: String,
        trim: true,
        default: null
    },
    address1: {
        type: String,
        trim: true,
        default: null
    },
    address2: {
        type: String,
        trim: true,
        default: null
    },
    pinCode: {
        type: String,
        trim: true,
        default: null
    }
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);