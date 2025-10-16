import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoSelections from './VideoSelections';
import VideosBySearch from './VideosBySearch';

function SearchWindow() {
    const params=useParams();
    const [allVideos,setAllVideos]=useState([]);
    const todaysDate = new Date();
    useEffect(()=>{
        async function getVideosBySearch(){
        try{
            const response=await fetch("http://localhost:5100/homeVideos");
            console.log(response);
            const json_response=await response.json();
            setAllVideos(json_response);
        }catch(error){
            console.log(error);
        }
    }
    getVideosBySearch();
    },[params.searchtext]);
    
    
  return (
    <div className='flex flex-col w-full pl-5  pr-5'>
        {
        
        allVideos.map((data,index)=>{
            
            if(data?.title?.toLowerCase().includes(params.searchtext.toLowerCase()))
            {
                const videoUploadDate = new Date(data.uploadDate);
          const daysAgo = parseInt(
            (todaysDate.getTime() - videoUploadDate.getTime()) /
              (24 * 60 * 60 * 1000)
          );
                return <VideosBySearch alignment="row" key={index} videoID={data.videoID} title={data.title} thumbnailURL={data.thumbnailURL} channelName={data.channelName} channelProfilePicture={data.channelProfilePicture} views={data.views} daysAgo={daysAgo}/>
            }
        })
        
        }
    </div>
  )
}

export default SearchWindow