import {getHomeVideos,getOneVideo, getVideosOfChannel, uploadVideo } from "../Controller/videos.controller.js";
import { authorizeUser } from "../Middlewear.js";
export function videosRoutes(app){
    app.get("/homeVideos",getHomeVideos);
    app.get("/OneVideo/:id",getOneVideo);
    app.post("/uploadVideo",authorizeUser,uploadVideo);
    app.get("/getVideosOfChannel/:channelID",authorizeUser,getVideosOfChannel);
    
}