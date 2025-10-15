import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetchOneVideo from '../CustomHooks/useFetchOneVideo';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { PiDotsThreeOutlineVerticalFill, PiShareFatLight } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { HiScissors } from "react-icons/hi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import VideoSelections from './VideoSelections';
import { MdOutlineSort } from "react-icons/md";
import { CgProfile } from "react-icons/cg";



function CurrentPlayingVideo({signedIn,setSignedIn,user,setUser}) {
    const params=useParams();
    const [moreOpened,setMoreOpened]=useState(false);
    const [videosData,setVideosData]=useState(null);
    const todaysDate=new Date();
    const oneVideo=useFetchOneVideo(params.id);
    const [decideRowOrColumn,setDecideRowOrColumn]=useState('col');
    const [hideDownloadAndClip,setHideDownloadAndClip]=useState(0);
    const [showCommentButtons,setShowCommentButtons]=useState(false);
    const [commentText,setCommentText]=useState("");

    useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  if (storedUser) {
    setUser(storedUser);
    console.log(storedUser);
    setSignedIn(true);
  }
}, []);

    useEffect(()=>{
        const updateLayout = () => {
        if(window.innerWidth>1023)
    {
        setDecideRowOrColumn('row');
    }
    else{
        setDecideRowOrColumn('col');
    }
    if(window.innerWidth>1024 && window.innerWidth<1191)
    {
        setHideDownloadAndClip(2);
    }
    else if(window.innerWidth>1190 && window.innerWidth<1260)
    {
        setHideDownloadAndClip(1);
    }
    else{
        setHideDownloadAndClip(0);
    }
    };

    updateLayout(); // run once
    window.addEventListener('resize', updateLayout);

    return () => window.removeEventListener('resize', updateLayout);
    },[window.innerWidth])
    
    async function uploadComment(){
        try{
            const requestoptions={
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("accesstoken")}` },
                body: JSON.stringify({userID : user.userID, userName: user.userName,text:commentText, userPfp : user.userPfp ,videoID:params.id}),
                
            }
            console.log("requestoptions:                "+JSON.stringify({userID : user.userID, userName: user.userName,text:commentText,userPfp:user.userPfp,videoID:params.id}));
            console.log("User object:", user);
            console.log("SignedIn:", signedIn);
            console.log("Access token:", localStorage.getItem("accesstoken"));
            const response =await fetch("http://localhost:5100/uploadcomment",requestoptions);
            console.log(response);
            console.log("executed 0")
            if(!(response.status==200))
            {
                throw new Error(response.status);
            }
            console.log("executed 1");
            const json_response=await response.json();
            console.log("executed 2");
            oneVideo.comments.push(json_response.userData);
            console.log("executed 3");
        }
        catch(error){
            console.log("er: "+ error);
        }
    }


    useEffect(()=>{
        const fetchData=async ()=>{
        try{
          const response= await fetch('http://localhost:5100/homeVideos');
          if(!response.ok)
          {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result=await response.json();   
            setVideosData(result);
          
        }catch(error){
          console.log(error);
        }
      }
      fetchData();
      },[]);
    if (!oneVideo) {
    return <div className="w-full flex justify-center items-center h-[80vh]">Loading...</div>;
    }
    const videoUploadDate=new Date(oneVideo.uploadDate);
    const videoUploadDateInMilli=videoUploadDate.getTime();
    console.log(oneVideo);

    return (
        <div className='w-[100%] grid [grid-template-areas:"video"_"relatedvideo"_"comments"] lg:grid-cols-8 lg:[grid-template-areas:"video_video_video_video_video_relatedvideo_relatedvideo_relatedvideo"_"comments_comments_comments_comments_comments_relatedvideo_relatedvideo_relatedvideo"]'>
    <div className='flex flex-col p-0 lg:pl-20 [grid-area:video]'>
        <iframe src={oneVideo.videoURL} allowFullScreen title='video' className='w-full aspect-video rounded-[0px] lg:rounded-[10px]'/>
        <span className='text-[20px] font-bold mt-2 mx-3 lg:mx-0'>{oneVideo.title}</span>
        <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='flex flex-row items-center mt-2 mx-3 lg:mx-0'>
                <img src={oneVideo.channelProfilePicture} className='rounded-[100%] w-[40px] h-[40px] mr-3'></img>
                <div className='flex flex-col'>
                    <span className='text-[14px] font-bold'>{oneVideo.channelName}</span>
                    <span className='text-[12px] line-clamp-1'>{oneVideo.subscribers>1000? (oneVideo.subscribers > 1000000 ? oneVideo.subscribers/1000000+"M" : (oneVideo.subscribers)/1000+"k"):oneVideo.subscribers} subscribers</span>
                </div>
                <button className='w-[100px] h-[40px] bg-black rounded-[30px] text-white ml-4'>Subscribe</button>
            </div>
            <div className='flex flex-row mx-3 lg:mx-0'>
                <button className='text-[12px] font-bold flex flex-row w-fit h-[40px] bg-gray-200 items-center mt-4 rounded-l-[30px] after:justify-self-end after:self-center after:w-[1px] after:h-[70%] after:bg-gray-400'><BiLike className='ml-3 w-[20px] h-[20px]'/>&nbsp;<span className='mr-2'>{oneVideo.likes>1000? (oneVideo.likes > 1000000 ? oneVideo.likes/1000000+"M" : parseInt((oneVideo.likes)/1000)+"k"):oneVideo.likes} likes</span></button>
                <button className='text-[12px] font-bold flex flex-row w-fit h-[40px] bg-gray-200 items-center mt-4 rounded-r-[30px]'><BiDislike className='mx-3 w-[20px] h-[20px]'/></button>
                <button className='text-[12px] font-bold flex flex-row w-fit h-[40px] bg-gray-200 items-center mt-4 ml-2 rounded-[20px] px-3'><PiShareFatLight className='w-[20px] h-[20px]'/>&nbsp;<span>Share</span></button>
                <button className={ hideDownloadAndClip==2?'hidden':'text-[12px] font-bold flex flex-row w-fit h-[40px] bg-gray-200 items-center mt-4 ml-2 rounded-[20px] px-3'}><LiaDownloadSolid className='w-[20px] h-[20px]'/>&nbsp;<span>Download</span></button>
                <button className={ hideDownloadAndClip==2 || hideDownloadAndClip==1?'hidden':'text-[12px] font-bold flex flex-row w-fit h-[40px] bg-gray-200 items-center mt-4 ml-2 rounded-[20px] px-3'}><HiScissors className='w-[20px] h-[20px]'/>&nbsp;<span>Clip</span></button>
                <button className='text-[12px] font-bold flex flex-row w-fit h-[40px] bg-gray-200 items-center mt-4 ml-2 rounded-[20px] px-3'><PiDotsThreeOutlineFill className='w-[20px] h-[20px]'/></button>
            </div>
        </div>
        <div className='flex flex-col m-3 p-2 bg-gray-300 rounded-[10px] lg:mx-0'>
            <div className='flex flex-row'>
                <span className='font-bold'>{oneVideo.views>1000? (oneVideo.views > 1000000 ? oneVideo.views/1000000+"M" : (oneVideo.views)/1000+"k"):oneVideo.views} views</span>&nbsp;
                <span className='font-bold'>{parseInt((todaysDate.getTime()- videoUploadDateInMilli)/(24*60*60*1000))} days ago</span>
            </div>
            <div className='h-fit'>
                {oneVideo.description.length >= 120 ? (moreOpened==false ? <span>{oneVideo.description.slice(0,119)}...<span className='font-bold' onClick={()=>setMoreOpened(true)}>more</span></span>:<span>{oneVideo.description}<br/><span className='font-bold' onClick={()=>setMoreOpened(false)}>show less</span></span>):<span>{oneVideo.description}</span>}
            </div>
        </div>
        
    </div>
    <div className='flex flex-col [grid-area:relatedvideo] justify-between h-fit sm:px-3 md:px-3'>
        {videosData && videosData.map((data,index)=>{
            return <VideoSelections alignment={decideRowOrColumn} key={index} videoID={data.videoID} title={data.title} thumbnailURL={data.thumbnailURL} channelName={data.channelName} channelProfilePicture={data.channelProfilePicture} views={data.views} daysAgo={parseInt((todaysDate.getTime()- videoUploadDateInMilli)/(24*60*60*1000))}/>
        })}
    </div>
    <div className='w-[100%] flex flex-col [grid-area:comments] sm:pl-3 md:pl-3 sm:pr-7 md:pr-7 lg:pl-20'>
        <div className='flex flex-row'>
            <span className='font-bold text-[20px]'>{oneVideo.comments.length} comments</span>
            <button className='flex flex-row ml-4 items-center'><MdOutlineSort className='w-[25px] h-[25px]'/> Sort by</button>
        </div>
        <div className='flex flex-row mt-4 items-start'>
            {!signedIn && <CgProfile className='w-[40px] h-[40px]'/>}
            {signedIn && <img src={user?.userPfp} className='w-[50px] h-[50px] rounded-[50%]'/>}
            <div className='flex flex-col w-[100%]'>
                <input type="text" placeholder=' Add a comment...' disabled={!signedIn?true:false} className=' w-[100%] border-b-1 border-gray-300 mx-4 outline-none focus:border-black' onFocus={()=>{setShowCommentButtons(true);}} onChange={(e)=>{setCommentText(e.target.value)}} value={commentText}></input>
                <div className='flex flex-row justify-end font-medium mt-2 mb-3'>
                {showCommentButtons?<><button className='mx-2 rounded-[15px]' onClick={()=>{setShowCommentButtons(false)}}>cancel </button><button disabled={commentText==""?true:false} className='px-2 py-1 bg-blue-600 rounded-[15px] text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed' onClick={()=>{uploadComment()}}>Comment</button></>:null}
                </div>
            </div>
        </div>
        {
        oneVideo.comments.map((data,index)=>{
            // const commentDate=new Date(data.timestamp);
            // const commentDateInMilli=videoUploadDate.getTime();
            console.log("data:         "+data);
                const commentDateInMilli=data.timestamp;
                return(
                    <div className='flex flex-row my-4 w-[100%]' key={index}>
                         <img src={data?.userPfp} className='w-[50px] h-[50px] rounded-[50%]'/>
                        
                        <div className='flex flex-col ml-3'>
                            <div className='flex flex-row items-end'>
                                <span className='font-bold text-[14px]'> @{data.userName}</span>
                                &nbsp;
                                <span className='text-[12px] text-gray-400 font-bold'>{parseInt((Date.now() - commentDateInMilli)/(24*60*60*1000))} days ago</span>
                            </div>
                            <span className='line-clamp-3'>{data.text}</span>
                            <div className='flex flex-row mt-2'>
                                <BiLike className='w-[20px] h-[20px] mr-3'/>
                                <BiDislike className='w-[20px] h-[20px] mr-3'/>
                                <span className='text-[14px] font-bold'>Reply</span>
                            </div>    
                        </div>
                        <PiDotsThreeOutlineVerticalFill className='ml-auto'/>
                    </div>
                )
            })}
    </div>
    </div>
  )
}

export default CurrentPlayingVideo