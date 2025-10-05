import mongoose from "mongoose";

const channelSchema=mongoose.Schema({
    channelID:{
        type:String,
        required:true
    },
    channelName:{
        type:String,
        required:true
    },
    channelDescription:{
        type:String,
        required:true
    },
    channelProfilePicture:{
        type:String
    },
    subscribers:{
        type:Number,
        required:true,
        default:0
    },
    channelCreationDate:{
        type:String,
        required:true
    }
});

const userSchema=mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    userProfilePicture:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    channels:[channelSchema]
})

export const User_data=mongoose.model("User_data",userSchema);