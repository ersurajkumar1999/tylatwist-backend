const likeModel = require("../models/Like");

const createLike = async (like) => {
    return await likeModel.create(like);
}
const getLikes = async () => {
    return await likeModel.find()
        .populate({
            path: 'likedBy',
            select: 'username email'
        });
}
const findLikeById = async (likeId) => {
    return await likeModel.findOne({ _id: likeId })
        .populate({
            path: 'likedBy',
            select: 'username email'
        });
}
module.exports = { createLike, getLikes, findLikeById }