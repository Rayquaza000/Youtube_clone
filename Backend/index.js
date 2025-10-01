import express from "express";
const app=new express();
app.listen(5100,()=>{
    console.log("server is listening on port 5100")
});