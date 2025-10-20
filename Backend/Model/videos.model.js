import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    commentID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userPfp: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true
    }

})

const videoSchema = mongoose.Schema({
    videoID: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailURL: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    channelID: {
        type: String,
        required: true
    },
    channelName: {
        type: String,
        required: true
    },
    channelProfilePicture: {
        type: String,
    },
    uploader: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
    },
    uploadDate: {
        type: String,
        required: true
    },
    comments: [commentSchema]


});

export const Video_data = mongoose.model("Video_data", videoSchema);