import { checkAndGetEmail, createChannel, getChannelFromChannelID, getUserByID, loginUser, signupNewUser } from "../Controller/users.controller.js";
import { authorizeUser } from "../Middlewear.js";

export function usersRoutes(app){
    app.post("/signup",signupNewUser);
    app.get("/checkAndGetEmail/:email",checkAndGetEmail)
    app.post("/login",loginUser);
    // app.get("/getUserData",authorizeUser,getUserData);
    app.post("/createChannel",authorizeUser,createChannel);
    app.get("/getChannelFromChannelID/:channelID",authorizeUser,getChannelFromChannelID);
    app.get("/getUserByID/:userID",authorizeUser,getUserByID);
}