import { User_data } from "../Model/users.model.js";
import { Id_data } from "../Model/ids.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"

export async function signupNewUser(req,res){
    try{
        const checkifemailexists=await User_data.findOne({email:req.body.email})
        if(checkifemailexists)
        {
            return res.status(500).json({"message":"exists"})
        }
        const newUserCredentials={};
        newUserCredentials.userName=req.body.userName;
        newUserCredentials.email=req.body.email;
        newUserCredentials.password=req.body.password;
        if(req.body.userPfp!="")
        {
        newUserCredentials.userPfp=req.body.userPfp;
        }
    const id_data= await Id_data.findOne();
    const userID=id_data.lastUserIDinSystem;
    const newUserIDNumber=(parseInt(userID.slice(6,))+1).toString();
    const newUserID="USER00"+newUserIDNumber;
    newUserCredentials.userID=newUserID;
    newUserCredentials.password=bcrypt.hashSync(req.body.password,10);

    const channelID= (await Id_data.findOne()).lastChannelIDinSystem;
    const newChannelIDNumber=(parseInt(channelID.slice(4,))+1).toString();
    const newChannelID="CH00"+newChannelIDNumber;
    const firstChannel={
        channelID : newChannelID,
        channelName : req.body.userName,
        channelDescription: " ",
        subscribers:0,
        channelCreationDate:(new Date()).toDateString()
    }
    if(req.body.userPfp!="")
    {
        firstChannel.channelProfilePicture=req.body.userPfp
    }
    newUserCredentials.channels=[ firstChannel ];
    await Id_data.findOneAndUpdate(
      {lastUserIDinSystem:userID},
      { lastUserIDinSystem: newUserID, lastChannelIDinSystem: newChannelID },
      { new: true }
    );
    const newUser=new User_data(newUserCredentials);
    newUser.save().then(()=>{return res.status(200).json({"message":"New user and channel created"})}).catch((error)=>{return res.status(500).json({"message":error})});
    }catch(error){return res.status(500).json({"message":error})}
}




export async function checkAndGetEmail(req,res){
    const user=await User_data.findOne({email:req.params.email});
    if(!user)
    {
        return res.status(404).json({"message":"email not found"})
    }
    return res.status(200).json({"email":user.email,"userName":user.userName,"userPfp":user.userPfp});

}




export async function loginUser(req,res){
    try{
        let {email,password}=req.body;
        console.log(email);
    let data=await User_data.findOne({email:email});
    console.log(data.userPfp);
    if(!data)
    {
        return res.status(404).json({"message":"User does not exist"});
    }
    else{
        let validPassword=bcrypt.compareSync(password,data.password);
        if(!validPassword)
        {
            return res.status(403).json({"message":"Invalid password"});
        }
        const token=jsonwebtoken.sign({ email: data.email, userID: data.userID },"logintoyoutube");
        return res.status(200).json({userID : data.userID,email:data.email,userName:data.userName,userPfp:data.userPfp,channels:data.channels,accesstoken:token});
    }
    }catch(err)
    {
        return res.status(500).json({"message":"server error",err});
    }
}



export async function createChannel(req,res){
    try{
    const user=await User_data.findOne({userID:req.body.userID});
    const id_data=await Id_data.findOne();
    const lastChannelID=id_data.lastChannelIDinSystem;
    const newChannelID="CH00"+(parseInt(lastChannelID.slice(4,))+1).toString();
    const newChannel={};
    newChannel.channelName=req.body.channelName;
    newChannel.channelDescription=req.body.channelDescription;
    newChannel.channelProfilePicture=req.body.channelProfilePicture;
    newChannel.channelID=newChannelID;
    newChannel.subscribers=0;
    newChannel.channelCreationDate=(new Date()).toDateString();
    user.channels.push(newChannel);
    await Id_data.findOneAndUpdate({lastChannelIDinSystem:lastChannelID},{lastChannelIDinSystem:newChannelID});
    await user.save();
    return res.status(200).json({"message":"New channel created"});
    }catch(err)
    {
        res.status(500).json({"message":err});
    }
}



export async function getChannelFromChannelID(req,res){
    try{
    const users=await User_data.find({});
    if(!users){
        return res.status(404).json({"message":"Channel not found"});
    }
    for (const user of users) {
      const foundChannel = user.channels.find(
        (ch) => ch.channelID === req.params.channelID
      );

      if (foundChannel) {
        return res.status(200).json({
          channelID: foundChannel.channelID,
          channelName: foundChannel.channelName,
          userName: user.userName,
          userProfilePicture: user.userProfilePicture,
          channelProfilePicture: foundChannel.channelProfilePicture,
          description: foundChannel.channelDescription,
          subscribers: foundChannel.subscribers,
        });
      }
    }
    return res.status(404).json({ message: "Channel not found" });
}catch(error){return res.status(500).json({"message":error})}
}



export async function getUserByID(req,res)
{
    try{
        const user=await User_data.findOne({userID:req.params.userID});
        console.log(user);
        if(!user){
        return res.status(404).json({"message":"User not found"});
        }
        return res.status(200).json(user);
    }
    catch(error)
    {
        return res.status(500).json({"message":error})
    }
}