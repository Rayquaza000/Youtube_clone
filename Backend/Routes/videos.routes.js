import { getHomeVideos,getOneVideo } from "../Controller/videos.controller.js";
export function videosRoutes(app){
    app.get("/homeVideos",getHomeVideos);
    app.get("/OneVideo/:id",getOneVideo);
}