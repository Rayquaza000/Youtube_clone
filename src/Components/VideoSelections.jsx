import React from 'react'
import youtube_icon from "../assets/Youtube_icon.png"

function VideoSelections({alignment,videoID,title,thumbnailURL,channelName,channelProfilePicture,views,daysAgo}) {
    if(alignment=="col")
    {
        return (
            <div className='flex flex-col w-[90%] xs:w-[50%] h-fit sm:w-[50%] md:w-[350px] md:h-fit'>
                <img src={thumbnailURL} className='w-[100%] h-[70%] rounded-[10px]'></img>
                <div className='flex flex-row my-2'>
                    <img src={channelProfilePicture} className='w-[40px] h-[40px] rounded-[50%] mx-3'></img>
                    <div className='flex flex-col'>
                        <span className='line-clamp-2 font-bold'>{ title}</span>
                        <span className='text-shadow-gray-500'>{channelName}</span>
                        <div className='flex flex-row'>
                            <span className='text-shadow-gray-500'>{views>1000?(views>1000000?(views/100000+"M"):(views/1000)+"k"):{views} } Views&nbsp;</span>.
                            <span> &nbsp;{daysAgo} days ago</span>
                        </div>
                    </div>
                </div>

            </div>
            );
    }
    else if(alignment=="row")
    {
        return (
            <div>VideoSelections row</div>
            );
    }
    return(
        <></>
    );
}

export default VideoSelections