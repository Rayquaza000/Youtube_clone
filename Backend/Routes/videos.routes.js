import { deleteThisComment, deleteThisVideoFromSystem, editThisComment, getHomeVideos, getOneVideo, getVideosOfChannel, incrementViewCount, postComment, uploadVideo } from "../Controller/videos.controller.js";
import { authorizeUser } from "../Middlewear.js";
export function videosRoutes(app) {
    app.get("/homeVideos", getHomeVideos);
    app.get("/OneVideo/:id", getOneVideo);
    app.post("/uploadVideo", authorizeUser, uploadVideo);
    app.get("/getVideosOfChannel/:channelID", authorizeUser, getVideosOfChannel);
    app.post("/uploadcomment", authorizeUser, postComment);
    app.delete("/deleteThisComment/:comID", authorizeUser, deleteThisComment);
    app.patch("/incrementViewCount", incrementViewCount);
    app.patch("/editThisComment/:comID", authorizeUser, editThisComment);
    app.delete("/deleteThisVideoFromSystem/:videoID", authorizeUser, deleteThisVideoFromSystem)
}