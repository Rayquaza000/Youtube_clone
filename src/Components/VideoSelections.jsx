import React from 'react'
import youtube_icon from "../assets/Youtube_icon.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { PiDotsThreeVerticalBold } from "react-icons/pi";


function VideoSelections({alignment,videoID,title,thumbnailURL,channelName,channelProfilePicture,views,daysAgo}) {
    const navigate=useNavigate();
    const location=useLocation();
    const currentPath=location.pathname;
    function openVideo(){
        navigate(`/currentplayingvideo/${videoID}`);
    }
    if(alignment=="col")
    {
        return (
            <div className='flex flex-col w-[90%] xs:w-[50%] h-fit sm:w-[50%] md:w-[350px] md:h-fit' onClick={()=>openVideo()}>
                <img src={thumbnailURL} className='w-[100%] h-[70%] rounded-[10px]'></img>
                <div className='flex flex-row my-2'>
                    {currentPath.slice(0,20)=="/currentplayingvideo"?null:<img src={channelProfilePicture} className='w-[40px] h-[40px] rounded-[50%] mr-3'></img>}
                    <div className='flex flex-col'>
                        <span className='line-clamp-2 font-bold'>{ title}</span>
                        <span className='text-gray-500'>{channelName}</span>
                        <div className='flex flex-row'>
                            <span className={currentPath.slice(0,20)=="/currentplayingvideo"?'text-gray-500 text-[13px] line-clamp-1':'text-gray-500'}>{views > 1000?(views > 1000000?(views/100000+"M"):(views/1000)+"k"):views } Views&nbsp;.</span>
                            <span className={currentPath.slice(0,20)=="/currentplayingvideo"?'text-gray-500 text-[13px] line-clamp-1':'text-gray-500'}> &nbsp;{daysAgo} days ago</span>
                        </div>
                    </div>
                    <PiDotsThreeVerticalBold className='w-15 h-15 self-start'/>
                </div>
                <div>

                </div>
            </div>
            );
    }
    else if(alignment=="row")
    {
        return (
            <div className={currentPath.slice(0,20)=="/currentplayingvideo"?'flex flex-row w-[90%] h-fit md:h-fit px-4':'flex flex-row w-[90%] h-fit md:h-fit'} onClick={()=>openVideo()}>
                {currentPath.slice(0,20)=="/currentplayingvideo"?<img src={thumbnailURL} className='w-[60%] h-[40%] rounded-[10px]'></img>:<img src={thumbnailURL} className='w-[100%] h-[70%] rounded-[10px]'></img>}
                <div className='flex flex-row mx-2 w-fit h-fit'>
                    {currentPath.slice(0,20)=="/currentplayingvideo"?null:<img src={channelProfilePicture} className='w-[40px] h-[40px] rounded-[50%] mr-3'></img>}
                    <div className='flex flex-col'>
                        {currentPath.slice(0,20)=="/currentplayingvideo"?<span className='line-clamp-2 font-bold text-[14px]'>{title}</span>:<span className='line-clamp-2 font-bold'>{title}</span>}
                        <span className={currentPath.slice(0,20)=="/currentplayingvideo"?'text-gray-500 text-[13px] line-clamp-1':'text-gray-500'}>{channelName}</span>
                        <div className='flex flex-row'>
                            <span className={currentPath.slice(0,20)=="/currentplayingvideo"?'text-gray-500 text-[13px] line-clamp-1':'text-gray-500'}>{views > 1000?(views > 1000000?(views/100000+"M"):(views/1000)+"k"):views } Views&nbsp;.</span>
                            <span className={currentPath.slice(0,20)=="/currentplayingvideo"?'text-gray-500 text-[13px] line-clamp-1':'text-gray-500'}> &nbsp;{daysAgo} days ago</span>
                        </div>
                    </div>
                    <PiDotsThreeVerticalBold className='w-20 h-20 self-start'/>
                </div>
                <div>

                </div>
            </div>
            );
    }
    return(
        <></>
    );
}

export default VideoSelections