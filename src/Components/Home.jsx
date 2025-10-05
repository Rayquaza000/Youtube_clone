import React, { useEffect, useState } from 'react';
import VideoSelections from './VideoSelections';
import useWindowSize from '../CustomHooks/useWindowSize';

const Home = ({ signedIn, hamburger }) => {
  const { width,height } = useWindowSize();
  const [videosData,setVideosData]=useState(null);
  const todaysDate=new Date()
  let homeWidth = '';

  if (width <= 767) {
    homeWidth = 'flex flex-wrap flex-row w-[100vw] h-[calc(100vh-80px)] md:flex-wrap md:justify-evenly md:mr-auto px-8';
  } else {
    if (hamburger === false) {
      homeWidth = 'flex flex-wrap flex-row w-[calc(100vw-33px)] h-[calc(100vh-80px)] md:flex-wrap md:justify-evenly md:mr-auto px-8';
    } else {
      homeWidth = 'flex flex-wrap flex-row w-[calc(100vw-250px)] h-[calc(100vh-80px)] md:flex-wrap md:justify-evenly md:mr-auto px-8';
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


  
  return (
    <div className={homeWidth} id="home">
      {videosData && videosData.map((data,index)=>{
        const videoUploadDate=new Date(data.uploadDate);
        const videoUploadDateInMilli=videoUploadDate.getTime()
        return <VideoSelections alignment="col" key={index} videoID={data.videoID} title={data.title} thumbnailURL={data.thumbnailURL} channelName={data.channelName} channelProfilePicture={data.channelProfilePicture} views={data.views} daysAgo={parseInt((todaysDate.getTime()- videoUploadDateInMilli)/(24*60*60*1000))}/>
      })}
    </div>
  );
};

export default Home;
