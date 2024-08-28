import userProfile from "../models/Profile.js";
export const createProfile = async (profile) => {
    return await userProfile.create(profile);
}
export const updateUserProfile = async (profileId, profileData) => {
    return await userProfile.findOneAndUpdate(
        { _id: profileId },
        { $set: profileData, updatedAt: new Date() },
        { new: true, upsert: true }
    );
}