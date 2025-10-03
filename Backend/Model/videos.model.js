import mongoose from "mongoose";

const videoSchema=mongoose.Schema({
    videoID:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
});

export const Video_data=mongoose.model("Video_data",videoSchema);