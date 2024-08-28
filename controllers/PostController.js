

// const { createLike, findLikeById } = require("../services/LikeServices");

import Post from "../models/Post.js";
import { errorResponseMessage, successResponseMessage, paginationResponseMessage } from "../helper/responseMessage.js";
import { createPost, findPostById, getAllPosts, totalPosts } from "../services/postServices.js";

export const postList = async (req, res) => {
    try {
        // Extract page and pageSize from the request body or use default values
        const page = parseInt(req.body.page) || 1;
        const pageSize = parseInt(req.body.pageSize) || 10;
        const skip = (page - 1) * pageSize;

        // Optionally, you can extract and use filter criteria if needed
        const filter = req.body.filter || {};

        // Get total number of posts
        const totalItems = await totalPosts(filter);

        // Fetch posts with pagination and filtering
        const data = await getAllPosts(skip, pageSize, filter);

        // Send paginated response
        return paginationResponseMessage(res, {
            message: "Posts fetched successfully!",
            status: true,
            data,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
        });
    } catch (error) {
        // Handle errors and send error response
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
export const create = async (req, res) => {
    try {
        const { content, images } = req.body
        const imageIds = images?.map(image => image._id);
        const userId = req.user.id;
        // if (!userId) {
        //     return errorResponseMessage(res, "Something went wrong User!");
        // }
        // if (userId) {
        //     return errorResponseMessage(res,userId);
        // }
        // if (!titel) {
        //     return errorResponseMessage(res, "Titel is required!");
        // }
        if (!content) {
            return errorResponseMessage(res, "Content is required!");
        }
        const post = await createPost({
            content, images: imageIds ?? [], createdBY: userId
        })
        // const updatePost = await findPostById(post._id);
        return successResponseMessage(res, "Post created successfully!", post);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

export const postLikeOld = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;
        if (!postId) {
            return errorResponseMessage(res, "Post Id is required!");
        }
        const result = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true });
        if (!result) {
            return errorResponseMessage(res, "Post not found", 404);
        }
        return successResponseMessage(res, "Post Like successfully!", result);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};
export const postUnLike = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;
        if (!postId) {
            return errorResponseMessage(res, "Post Id is required!");
        }
        const result = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
        if (!result) {
            return errorResponseMessage(res, "Post not found", 404);
        }
        return successResponseMessage(res, "Post UnLike successfully!", result);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
export const postLike = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;
        if (!postId) {
            return errorResponseMessage(res, "Post Id is required!");
        }
        const like = await createLike({ postId, likedBy: userId });
        const result = await Post.findByIdAndUpdate(postId, { $push: { likes: like._id } }, { new: true });
        if (!result) {
            return errorResponseMessage(res, "Post not found", 404);
        }
        const likeData = await findLikeById(like._id);
        return successResponseMessage(res, "Post Like successfully!", likeData);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};