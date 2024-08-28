import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'comment', 'share', 'follow'],
        required: true
    },
    message: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });
export default mongoose.model("Notification", notificationSchema);



