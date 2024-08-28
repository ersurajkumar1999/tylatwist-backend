import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
}, { timestamps: true });

export default mongoose.model("Like", likeSchema);
