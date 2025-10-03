import React from 'react';
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdHistory } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { IoIosRadio } from "react-icons/io";
import { SiYoutubegaming } from "react-icons/si";
import { MdNewspaper } from "react-icons/md";
import { CiTrophy } from "react-icons/ci";
import { GiGraduateCap } from "react-icons/gi";
import { GiHanger } from "react-icons/gi";
import { MdOutlinePodcasts } from "react-icons/md";
import { AiFillYoutube } from "react-icons/ai";
import { SiYoutubemusic } from "react-icons/si";
import { TbBrandYoutubeKids } from "react-icons/tb";
import { SiYoutubekids } from "react-icons/si";



const Sidebar = ({hamburger}) => {
  return (
    
    ( hamburger && <div className='absolute bg-white w-[250px] h-[calc(100vh-80px)] md:static md:flex md:flex-col px-2.5 overflow-y-auto overflow-x-hidden'>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><IoMdHome className='w-[25px] h-[25px] -translate-y-[3px]'/><span className='ml-[20px]'>Home</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><SiYoutubeshorts className='w-[20px] h-[20px] -translate-y-[3px] '/><span className='ml-[20px]'>Shorts</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><MdOutlineSubscriptions className='w-[20px] h-[20px] -translate-y-[3px] '/><span className='ml-[20px]'>Subscriptions</span></button>
        <hr className='text-gray-300 my-1.5'></hr>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><CgProfile className='w-[20px] h-[20px] -translate-y-[1px] '/><span className='ml-[20px]'>You</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><MdHistory className='w-[20px] h-[20px] -translate-y-[1px] '/><span className='ml-[20px]'>History</span></button>
        <hr className='text-gray-300 my-1.5'></hr>
        <span className='flex flex-row items-center p-1 px-6'>Sign in to like videos, comment and subscribe.</span>
        <div className='flex flex-row w-fit h-[30px] items-center justify-center border-gray-300 border-solid border-[1px] ml-[20px] rounded-2xl'>
            <CgProfile className='w-[19px] h-[19px] m-[3px] ml-[5px] text-blue-600'/>
            <span className='mr-[10px] text-blue-600'>Sign in</span>
        </div>
        <hr className='text-gray-300 my-1.5'></hr>
        <span className='ml-[20px] my-[5px] font-bold'>Explore</span>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><LuShoppingBag className='w-[20px] h-[20px]'/><span className='ml-[20px]'>Shopping</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><IoMusicalNotesOutline  className='w-[20px] h-[20px]'/><span className='ml-[20px]'>Music</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><BiMoviePlay  className='w-[20px] h-[20px]'/><span className='ml-[20px]'>Movies</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><IoIosRadio className='w-[20px] h-[20px]'/><span className='ml-[20px]'>Live</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><SiYoutubegaming  className='w-[20px] h-[20px]'/><span className='ml-[20px]'>Gaming</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><MdNewspaper className='w-[20px] h-[20px]'/><span className='ml-[20px]'>News</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><CiTrophy  className='w-[20px] h-[20px]'/><span className='ml-[20px]'>Sports</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><GiGraduateCap  className='w-[20px] h-[20px]'/><span className='ml-[20px]'>Courses</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><GiHanger className='w-[20px] h-[20px]'/><span className='ml-[20px]'>Fashion & Beauty</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><MdOutlinePodcasts className='w-[20px] h-[20px]'/><span className='ml-[20px]'>Podcasts</span></button>
        <hr className='text-gray-300 my-1.5'></hr>
        <span className='ml-[20px] my-[5px] font-bold'>More from YouTube</span>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><AiFillYoutube className='w-[20px] h-[20px] text-red-600'/><span className='ml-[20px]'>Youtube Premium</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><SiYoutubemusic  className='w-[20px] h-[20px] text-red-600'/><span className='ml-[20px]'>Youtube Music</span></button>
        <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 hover:bg-gray-100'><SiYoutubekids  className='w-[20px] h-[20px] text-red-600'/><span className='ml-[20px]'>Youtube Kids</span></button>
    </div>) ||
    (!hamburger &&
    <div className=' hidden md:flex md:flex-col bg-white'>
        <button className='my-3 text-[12px] active:bg-gray-100 rounded-[5px] flex flex-col items-center p-1 mx-2 hover:bg-gray-100'><IoMdHome className='w-[25px] h-[25px] '/><span>Home</span></button>
        <button className='my-3 text-[12px] active:bg-gray-100 rounded-[5px] flex flex-col items-center p-1 mx-2 hover:bg-gray-100'><SiYoutubeshorts className='w-[25px] h-[25px] '/><span>Shorts</span></button>
        <button className='my-3 text-[10px] active:bg-gray-100 rounded-[5px] flex flex-col items-center p-1 mx-2 hover:bg-gray-100'><MdOutlineSubscriptions className='w-[25px] h-[25px] '/><span>Subscriptions</span></button>
        <button className='my-3 text-[12px] active:bg-gray-100 rounded-[5px] flex flex-col items-center p-1 mx-2 hover:bg-gray-100'><CgProfile className='w-[25px] h-[25px] '/><span>You</span></button>
        <button className='my-3 text-[12px] active:bg-gray-100 rounded-[5px] flex flex-col items-center p-1 mx-2 hover:bg-gray-100'><MdHistory className='w-[25px] h-[25px] '/><span>History</span></button>
    </div>)
  )
}

export default Sidebar