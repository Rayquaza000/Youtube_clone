import React, { useState,useEffect } from 'react'

function useFetchOneVideo(videoID) {
    const [videosData,setVideosData]=useState(null);
    useEffect(()=>{
        const fetchData=async ()=>{
        try{
          const response= await fetch(`http://localhost:5100/OneVideo/${videoID}`);
          
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
      },[videoID]);
      
  return (videosData);
}

export default useFetchOneVideo