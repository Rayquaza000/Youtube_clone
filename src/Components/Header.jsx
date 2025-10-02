import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import youtube_icon from "../assets/Youtube_icon.png";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";





const Header = ({setHamburger, hamburger}) => {
    const [signedIn,setSignedIn]=useState(true);
    
  return (
    <div className='flex flex-row w-full h-[80px] items-center justify-between'>
        <div className='flex flex-row w-1/2 h-full items-center sm:w-1/3'>
            <GiHamburgerMenu className='w-[25px] h-[40px] ml-[30px]' onClick={()=>setHamburger(!hamburger)}/>
            <img src={youtube_icon} className='w-[35px] h-[20px] ml-[15px]'/>
            <span className='font-bold text-[20px]'>YouTube<sup className='font-normal text-[14px]'>IN</sup></span>
        </div>
        <div className='flex flex-row w-0 h-full items-center sm:w-1/3 sm:py-[10px] sm:px-[10px] overflow-hidden md:w-5/12'>
            <input className='w-2/3 h-[40px] bg-white border-solid border-gray-400 border-[1px] rounded-l-2xl' type="text" placeholder=" Search"></input>
            <button className='w-[50px] h-[40px] bg-neutral-300 border-gray-400 border-[1px] rounded-r-2xl flex justify-center items-center'><IoSearchOutline/></button>
            <FaMicrophone className='w-[20px] h-[20px] m-[10px]'/>
        </div>
        <div className='flex flex-row w-1/2 h-full items-center justify-end sm:w-1/3 md:w-1/4'>
            <IoSearchOutline className='w-[20px] h-[20px] m-[10px] sm:hidden '/>
            <FaMicrophone className='w-[20px] h-[20px] m-[10px] sm:hidden'/>
            <PiDotsThreeOutlineVerticalFill className='w-[20px] h-[20px] m-[10px]'/>
            {!signedIn && <div className='flex flex-row w-fit h-[30px] items-center justify-center border-gray-300 border-solid border-[1px] m-[10px] mr-[20px] rounded-2xl'>
                <CgProfile className='w-[19px] h-[19px] m-[3px] ml-[5px] text-blue-600'/>
                <span className='mr-[10px] text-blue-600'>Sign in</span>
            </div>}
            {signedIn && <CgProfile className='w-[19px] h-[19px] mr-[20px]'/>}
        </div>
    </div>
  )
}

export default Header