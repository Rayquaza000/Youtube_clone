import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import youtube_icon from "../assets/Youtube_icon.png"
import VideoSelections from './VideoSelections';

function YoutubeStudio({user,setUser}) {
    const lsStorage=localStorage.getItem("userInfo");
    const token=(JSON.parse(lsStorage)).accesstoken;
    const [hamburger,setHamburger]=useState(false);
    const [backdrop,setBackdrop]=useState(false);
    const [dropdownValue,setDropdownValue]=useState(user?user.channels[0]:"");
    const [channelVideos,setChannelVideos]=useState(null);
    const [title,setTitle]=useState("");
    const [videoURL,setVideoURL]=useState("");
    const [thumbnailURL,setThumbnailURL]=useState("");
    const [description,setDescription]=useState("");
    const todaysDate=new Date();
    useEffect(() => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
  const currentChannelFromLocalStorage = localStorage.getItem("currentChannel");

  // if no user in prop but found in localStorage
  if (!user && userFromLocalStorage) {
    setUser(userFromLocalStorage);
  }

  // set dropdownValue only when user is available
  if (userFromLocalStorage) {
    if (currentChannelFromLocalStorage) {
      setDropdownValue(currentChannelFromLocalStorage);
    } else {
      setDropdownValue(userFromLocalStorage.channels[0].channelID);
    }
  }
}, [user]);
    
    useEffect(()=>{
        async function getVideosForChannel(){
            try{
                if(dropdownValue=="")
                {
                    return 0;
                }
                const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` }
        };
            const response=await fetch(`http://localhost:5100/getVideosOfChannel/${dropdownValue}`,requestOptions);
            console.log(response);
            if(!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
                
            }
            const json_response=await response.json();
            setChannelVideos(json_response.videos);
            
        }catch(err){console.log("error"+err)}
        }

        getVideosForChannel();

    },[dropdownValue])

    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setBackdrop(true);
      } else {
        setBackdrop(false);
        
      }
    };

    // Run on mount to set initial state
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function uploadVideoToSystem(){
    try{
        const requestOptions2 = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
        };
        console.log(dropdownValue);
        const response2=await fetch(`http://localhost:5100/getChannelFromChannelID/${dropdownValue}`,requestOptions2);
        if(!response2.ok)
        {
            throw new Error(`HTTP error! status: ${response2.status} ${response2.body["message"]}`);
        }
        console.log(response2);
        const json_response2=await response2.json();
        
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
        body: JSON.stringify({videoURL:videoURL,title:title,thumbnailURL:thumbnailURL,description:description,channelID:dropdownValue,channelName:json_response2.channelName,channelProfilePicture:json_response2.userProfilePicture,uploader:json_response2.userName})
        };
        const response= await fetch("http://localhost:5100/uploadVideo",requestOptions);
        if(!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status} ${response.body["message"]}`);
        }
        const json_response=await response.json();
        console.log(json_response.message);
    }catch(err){console.log(err)}
  }

  return (
    <div className='flex flex-col'>
        <div className='flex flex-row h-[80px] items-center shadow-md z-5'>
            <GiHamburgerMenu className='w-[25px] h-[40px] ml-[30px]' onClick={()=>setHamburger(!hamburger)}/>
            <img src={youtube_icon} className='w-[35px] h-[20px] ml-[15px]'/>
            <span className='font-bold text-[20px]'>Studio</span>
        </div>
        <div className='flex flex-row w-[100%] h-[calc(100vh-80px)]'>
            {hamburger && <div className='absolute flex flex-col w-[250px] h-full z-3 items-center bg-white border-r-1 border-gray-300 lg:static'>
                <img src={user.userProfilePicture} className='w-[100px] h-[100px] rounded-[50%] mt-5'></img>
                <span className='font-medium'>Your channel</span>
                {/* <span className='text-[14px]'>{user.channels[0].channelName}</span> */}
                <select onChange={(event)=>{setDropdownValue(event.target.value);localStorage.setItem("currentChannel",event.target.value)}}  value={dropdownValue}>
                    {user?.channels.map((data,index)=><option key={index} value={data.channelID}>{data.channelName}</option>)}
                </select>
            </div>}
            <div className='w-[100%] flex flex-col p-5'>
                <span className='text-[24px] font-medium'>Channel Dashboard</span>
                <div className='flex flex-col border-1 border-gray-300 rounded-[15px] justify-center px-3 py-5'>
                    
                    <span>Title:</span>
                    <input type="text" className='w-[100%] px-2 h-[50px] border-1 border-gray-500 rounded-[10px]' placeholder='Title' onChange={(event)=>{setTitle(event.target.value)}} value={title}/>
                    <span className='mt-5'>Video URL:</span>
                    <input type="text" className='w-[100%] px-2 h-[50px] border-1 border-gray-500 rounded-[10px]' placeholder='Video URL' onChange={(event)=>{setVideoURL(event.target.value)}} value={videoURL}/>
                    <span className='mt-5'>Thumbnail URL:</span>
                    <input type="text" className='w-[100%] px-2 h-[50px] border-1 border-gray-500 rounded-[10px]' placeholder='Thumbnail URL' onChange={(event)=>{setThumbnailURL(event.target.value)}} value={thumbnailURL}/>
                    <span className='mt-5'>Description:</span>
                    <input type="text" className='w-[100%] px-2 h-[50px] border-1 border-gray-500 rounded-[10px]' placeholder='Description' onChange={(event)=>{setDescription(event.target.value)}} value={description}/>
                    <button className='bg-black text-white px-3 py-2 rounded-[15px] mt-5' onClick={()=>{uploadVideoToSystem()}}>Upload Video</button>
                </div>
            </div>
            {hamburger && backdrop && <div className='absolute w-full h-full bg-[rgba(60,60,60,0.5)] z-2'></div>}
        </div>
        <div className='flex flex-col px-5'>
                {channelVideos?.map((data,index)=>{const videoUploadDate=new Date(data.uploadDate);const videoUploadDateInMilli=videoUploadDate.getTime();return(<VideoSelections key={index} alignment={"col"} videoID={data.videoID} title={data.title} thumbnailURL={data.thumbnailURL} channelName={data.channelName} channelProfilePicture={data.channelProfilePicture} views={data.views} daysAgo={parseInt((todaysDate.getTime()- videoUploadDateInMilli)/(24*60*60*1000))}/>);})}
                </div>
    </div>
  )
}

export default YoutubeStudio