import express from "express";
import mongoose from "mongoose";
import { Video_data } from "./Model/videos.model.js";
import { videosRoutes } from "./Routes/videos.routes.js";
import cors from "cors";

const app=new express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://mehtapratik2001_db_user:s6FB0kGhpNWIEkov@cluster0.e5nb1dw.mongodb.net/youtube_clone_data");
const db=mongoose.connection;
db.on("open",()=>{
    console.log("database connection successful")
})
db.on("error",()=>{
    console.log("database connection error")
})

videosRoutes(app);

app.listen(5100,()=>{
    console.log("server is listening on port 5100")
});