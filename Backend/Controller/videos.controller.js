import { Video_data } from "../Model/videos.model.js";
import { User_data } from "../Model/users.model.js";

export async function getHomeVideos(req,res){
    const homeVideos=await Video_data.find();
    return res.json(homeVideos);
}

export async function getOneVideo(req,res){
    const oneVideo=await Video_data.findOne({videoID : req.params.id});
    const videoChannel=await User_data.findOne({'channels.channelID' : oneVideo.channelID});
    let matchedChannel;
    videoChannel.channels.forEach((item)=>{
        if(oneVideo.channelID==item.channelID)
        {
            matchedChannel=item;
            oneVideo.subscribers=matchedChannel.subscribers;
            return res.json(oneVideo);
        }})    
    
    
}