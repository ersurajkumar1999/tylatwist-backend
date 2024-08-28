import postModel from "../models/Post.js";

export const createPost = async (post) => {
    return await postModel.create(post);
}
export const findPostById = async (userId) => {
    return await postModel.findOne({ _id: userId })
        .populate('createdBY')
        .populate({
            path: 'createdBY',
            select: 'email username',
            populate: {
                path: 'profile', // Populate profile information of the user
                select: 'firstName lastName image'
            }
        })
        .populate({
            path: 'images',
            select: 'imagePath imageId', // Select only the imagePath field from the Image model
            // match: { status: true, isDeleted: false } // Optionally, you can add conditions to filter images
        });
}
// const deleteUserById = async (userId) => {
//     return await postModel.deleteOne({ _id: userId });
// }
// const updateUserByID = async (userId, updatedUserData) => {
//     return await postModel.findOneAndUpdate({ _id: userId }, { $set: updatedUserData }, { new: true });
// }
export const totalPosts = async () => {
    return await postModel.countDocuments();
}
export const getAllPosts = async (skip, pageSize) => {
    // return await postModel.find()
    //     .populate('createdBY')
    //     .populate({
    //         path: 'createdBY',
    //         select: 'email username',
    //         populate: {
    //             path: 'profile', // Populate profile information of the user
    //             select: 'firstName lastName image'
    //         }
    //     })
    //     // .populate({
    //     //     path: 'images',
    //     //     select: 'imageUrl imageId', // Select only the imagePath field from the Image model
    //     //     // match: { status: true, isDeleted: false } // Optionally, you can add conditions to filter images
    //     // })
    //     .sort({ createdAt: -1 })
    //     .skip(skip).
    //     limit(pageSize).
    //     exec();

    return await postModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'createdBY',
                foreignField: '_id',
                as: 'createdBY'
            }
        },
        {
            $unwind: {
                path: '$createdBY',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post',
                as: 'comments'
            }
        },
        {
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'post',
                as: 'likes'
            }
        },
        {
            $addFields: {
                totalComments: { $size: '$comments' },
                totalLikes: { $size: '$likes' }
            }
        },
        {
            $project: {
                comments: 0,
                likes: 0
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $skip: skip
        },
        {
            $limit: pageSize
        }
    ]).exec();
}