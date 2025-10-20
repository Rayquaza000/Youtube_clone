import mongoose from "mongoose";

const channelSchema = mongoose.Schema({
    channelID: {
        type: String,
        required: true
    },
    channelName: {
        type: String,
        required: true
    },
    channelDescription: {
        type: String,
        required: true
    },
    channelProfilePicture: {
        type: String,
        default: "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y="
    },
    subscribers: {
        type: Number,
        required: true,
        default: 0
    },
    channelCreationDate: {
        type: String,
        required: true
    }
});

const userSchema = mongoose.Schema({
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
        default: "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y="
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    channels: [channelSchema]
})

export const User_data = mongoose.model("User_data", userSchema);