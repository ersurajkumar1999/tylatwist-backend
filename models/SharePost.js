import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });

export default mongoose.model("SharePost", shareSchema);
