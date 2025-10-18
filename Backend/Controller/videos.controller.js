import { Video_data } from "../Model/videos.model.js";
import { User_data } from "../Model/users.model.js";
import { Id_data } from "../Model/ids.model.js";
import jsonwebtoken from "jsonwebtoken";
export async function getHomeVideos(req,res){
    try{
    const homeVideos=await Video_data.find();
    
    return res.json(homeVideos);
    }catch(error){
        res.json(error);
    }
}

export async function getOneVideo(req,res){
    try{
    const oneVideo=await Video_data.findOne({videoID : req.params.id});
    const videoChannel=await User_data.findOne({'channels.channelID' : oneVideo.channelID});
    let matchedChannel;
    videoChannel.channels.forEach((item)=>{
        if(oneVideo.channelID==item.channelID)
        {
            matchedChannel=item;
            oneVideo.subscribers=matchedChannel.subscribers;
            return res.json(oneVideo);
        }});    
    }catch(error)
    {
        console.log(error.message);
    }
}

export async function uploadVideo(req,res)
{
    try{
        console.log("1");
        const id_data= await Id_data.findOne();
        const lastVideoID=id_data.lastVideoIDinSystem;
        const newVideoID="V00"+(parseInt(lastVideoID.slice(3,))+1).toString();
        console.log(req.body);
        const newVideo=new Video_data(req.body);
        console.log("2");
        newVideo.videoID=newVideoID;
        newVideo.likes=0;
        newVideo.dislikes=0;
        newVideo.views=0;
        newVideo.comments=[];
        newVideo.uploadDate=(new Date()).toDateString();
        console.log("3");
        await Id_data.findOneAndUpdate({lastVideoIDinSystem:lastVideoID},{lastVideoIDinSystem:newVideoID});
        newVideo.save().then(()=>{return res.status(201).json({"message":"Video uploaded successfully"})}).catch((error)=>{return res.status(500).json({"message":error})});
        
    }catch(error)
    {
        return res.status(500).json({"message":"Server error",error});
    }
}

export async function getVideosOfChannel(req,res){
    try{
    const videosOfChannel=await Video_data.find({channelID:req.params.channelID});
    
    if(!videosOfChannel)
    {
        return res.status(404).json({"message":"Videos not found"})
    }
    return res.status(200).json({"videos":videosOfChannel});
}
catch(error){return res.status(500).json({"message":"Server error",error});}
}



export async function postComment(req,res)
{
    try{
        const currentVideo= await Video_data.findOne({videoID:req.body.videoID});
        if(!currentVideo){
            return res.status(500).json({"message":"Comment not uploaded. Internal server error"})
        }
        const id_data= await Id_data.findOne();
        const lastCommentID=id_data.lastCommentIDinSystem;
        const newCommentID="COM00"+(parseInt(lastCommentID.slice(5,))+1).toString();
        const timeStamp=Date.now();
        const commentObject= {}
        commentObject.userID=req.body.userID;
        commentObject.commentID=newCommentID;
        commentObject.userName=req.body.userName;
        commentObject.text=req.body.text; 
        commentObject.userPfp=req.body.userPfp;
        commentObject.timestamp=timeStamp;
        currentVideo.comments.push(commentObject);
        await Id_data.findOneAndUpdate({lastCommentIDinSystem:lastCommentID},{lastCommentIDinSystem:newCommentID});
        currentVideo.save().then(()=>{return res.status(200).json({"userData":commentObject})}).catch((error)=>{res.status(404).json({"error":error})});
        }
    catch(error){
        return res.status(500).json({"message":"Server error",error});
    }
}

export async function deleteThisComment(req,res)
{
    try{
        const commentVideo=await Video_data.findOne({videoID:req.body.videoID});
        const indexofcom=await commentVideo.comments.findIndex(com=>com.comID==req.params.comID);
        commentVideo.comments.splice(indexofcom,1);
        commentVideo.save().then(()=>{return res.status(200).json({"message":"comment successfully deleted"});}).catch((error)=>{return res.status(500).json({"error":error})});
    }catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function incrementViewCount(req,res)
{
    try{
        const videodata=await Video_data.findOne({videoID:req.body.videoID});
        videodata.views=videodata.views+1;
        videodata.save().then(()=>{return res.status(200).json({"message":"view count incremented"})}).catch((error)=>{return res.status(500).json({"error":error})});
    }catch(error)
    {
        return res.status(500).json({"error":error})
    }
}

export async function editThisComment(req, res) {
  try {
    const videodata = await Video_data.findOne({ videoID: req.body.videoID });
    if (!videodata) {
      return res.status(404).json({ message: "Video not found" });
    }

    const commentToBeEdited = videodata.comments.find(
      (com) => com.commentID === req.params.comID
    );

    if (!commentToBeEdited) {
      return res.status(404).json({ message: "Comment not found" });
    }

    commentToBeEdited.text = req.body.text;

    await videodata.save();

    return res.status(200).json({
      message: "Comment updated successfully",
      updatedComment: commentToBeEdited,
    });
  } catch (error) {
    console.error("Error editing comment:", error);
    return res.status(500).json({ error: error.message });
  }
}
