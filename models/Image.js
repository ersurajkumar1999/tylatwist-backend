import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    createdBY: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    imageId: {
        type: String,
        trim: true,
        required: true,
    },
    imageType: {
        type: String,
        trim: true,
        required: true,
    },
    imageSize: {
        type: String,
        trim: true,
        required: true,
    },
    imagePath: {
        type: String,
        trim: true,
        required: true,
    },
    imageUrl: {
        type: String,
        trim: true,
        required: true,
    },
    folderName: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,// If this is using then True
    },
    isDeleted: {
        type: Boolean,
        default: true, // If this is delete then True
    },
}, { timestamps: true });

export default mongoose.model("Image", imageSchema);
