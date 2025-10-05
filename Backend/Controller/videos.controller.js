import { Video_data } from "../Model/videos.model.js";

export async function getHomeVideos(req,res){
    const homeVideos=await Video_data.find();
    return res.json(homeVideos);
}

export async function getOneVideo(req,res){
    const oneVideo=await Video_data.findOne({videoID : req.params.id})
    return res.json(oneVideo)
}