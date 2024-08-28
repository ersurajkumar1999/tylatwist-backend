
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true,
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    type: {
        type: String,
        enum: ['IMAGE', 'DOCUMENT', 'VIDEO', 'AUDIO', 'GIF', 'OTHER'],
    },
    status: {
        type: Boolean,
        default: true,
    },
    deletedAt: { type: Date, default: null },
    createdBY: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    comments: [{
        text: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }],
}, { timestamps: true });

export default mongoose.model("Post", postSchema);

