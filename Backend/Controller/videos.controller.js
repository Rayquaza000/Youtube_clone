import { Video_data } from "../Model/videos.model.js";

export async function getHomeVideos(req,res){
    const homeVideos=await Video_data.find();
    return res.json(homeVideos);
}