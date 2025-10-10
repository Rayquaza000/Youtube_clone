import mongoose from "mongoose";

const idSchema=mongoose.Schema({
    lastUserIDinSystem:{
        type:String,
        required:true
    },
    lastChannelIDinSystem:{
        type:String,
        required:true
    },
    lastVideoIDinSystem:{
        type:String,
        required:true
    },
    lastCommentIDinSystem:{
        type:String,
        required:true
    }
});

export const Id_data=mongoose.model("Id_data",idSchema);