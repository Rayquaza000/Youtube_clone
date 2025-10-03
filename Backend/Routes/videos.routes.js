import { getHomeVideos } from "../Controller/videos.controller.js";
export function videosRoutes(app){
    app.get("/homeVideos",getHomeVideos);
}