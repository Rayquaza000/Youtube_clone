import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PiDotsThreeVerticalBold } from 'react-icons/pi';

function VideosBySearch({alignment,videoID,title,thumbnailURL,channelName,channelProfilePicture,views,daysAgo}) {
    const navigate=useNavigate();
  return (
    <div className='w-[100%] flex flex-row hover:bg-gray-300 rounded-[15px] p-5' onClick={()=>{navigate(`/currentplayingvideo/${videoID}`)}}>
        <img src={thumbnailURL} className='w-[30%] h-[100%] min-w-[250px] min-h-[180px] rounded-[15px]'/>
        <div className='flex flex-col ml-4'>
            <span className="text-[20px] font-medium">{title}</span>
            <div className='flex flex-row text-gray-500'>
            <span>{views} Views </span>
            <span> &nbsp;.&nbsp; </span>
            <span>{daysAgo} days ago</span>
            </div>
            <div className='flex flex-row items-center mt-3'>
            <img src={channelProfilePicture} className='rounded-[50%] w-[40px] h-[40px] '/>
            <span className='ml-2 text-gray-500'>{channelName}</span>
            </div>
    
        </div>
        <PiDotsThreeVerticalBold className='w-[30px] h-[30px] ml-auto mb-auto'/>
    </div>
  )
}

export default VideosBySearch