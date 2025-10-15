import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import youtube_icon from "../assets/Youtube_icon.png";
import { IoSearchOutline } from "react-icons/io5";
import { FaGoogle, FaMicrophone } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { GoSignOut } from 'react-icons/go';
import { SiYoutubestudio } from 'react-icons/si';
import { CiDollar } from 'react-icons/ci';
import { RiShieldUserLine } from 'react-icons/ri';
import { LuSettings } from 'react-icons/lu';
import { IoIosHelpCircleOutline } from 'react-icons/io';





const Header = ({setHamburger, hamburger,signedIn,setSignedIn,user,setUser}) => {
    const navigate=useNavigate();
    const [showProfile,setShowProfile]=useState(false);
    const [searchText,setSearchText]=useState("");
    function signOutFromAccount(){
        setShowProfile(false);
    setUser(null);
    setSignedIn(false);
    localStorage.clear();
    window.location.reload();
  }
  function searchBySearchBar()
  {
    if (!searchText.trim()) {
    return;
  }
    navigate(`/search/${searchText}`);
  }
  return (
    <div className='flex flex-row w-full h-[80px] items-center justify-between'>
        <div className='flex flex-row w-1/2 h-full items-center sm:w-1/3'>
            <GiHamburgerMenu className='w-[25px] h-[40px] ml-[30px]' onClick={()=>setHamburger(!hamburger)}/>
            <img src={youtube_icon} className='w-[35px] h-[20px] ml-[15px]'/>
            <span className='font-bold text-[20px]' onClick={()=>{navigate("/")}} >YouTube<sup className='font-normal text-[14px]'>IN</sup></span>
        </div>
        <div className='flex flex-row w-0 h-full items-center sm:w-1/3 sm:py-[10px] sm:px-[10px] overflow-hidden md:w-5/12'>
            <input className='w-2/3 h-[40px] bg-white border-solid border-gray-400 border-[1px] rounded-l-2xl pl-3' type="text" placeholder="Search" value={searchText} onChange={(e)=>{setSearchText(e.target.value);}}></input>
            <button className='w-[50px] h-[40px] bg-neutral-300 border-gray-400 border-[1px] rounded-r-2xl flex justify-center items-center' onClick={()=>{searchBySearchBar();}}><IoSearchOutline/></button>
            <FaMicrophone className='w-[20px] h-[20px] m-[10px]'/>
        </div>
        <div className='flex flex-row w-1/2 h-full items-center justify-end sm:w-1/3 md:w-1/4'>
            <IoSearchOutline className='w-[20px] h-[20px] m-[10px] sm:hidden '/>
            <FaMicrophone className='w-[20px] h-[20px] m-[10px] sm:hidden'/>
            {signedIn && <div className='bg-gray-300 px-3 py-2 rounded-[20px] flex flex-row items-center' onClick={()=>{navigate("/youtubestudio")}}><span className='font-medium line-clamp-1'>+ Create</span></div>}
            <PiDotsThreeOutlineVerticalFill className='w-[20px] h-[20px] m-[10px]'/>
            {!signedIn && <div className='flex flex-row w-fit h-[30px] items-center justify-center border-gray-300 border-solid border-[1px] m-[10px] mr-[20px] rounded-2xl' onClick={()=>{navigate("/signin")}}>
                <CgProfile className='w-[19px] h-[19px] m-[3px] ml-[5px] text-blue-600'/>
                <span className='mr-[10px] text-blue-600'>Sign in</span>
            </div>}
            {signedIn && <img src={user.userPfp} className='w-[30px] h-[30px] mr-[20px] rounded-[50%]' onClick={()=>{setShowProfile(!showProfile)}}/>}
            
            {showProfile && <div className='flex flex-col absolute shadow-sm shadow-black top-[20px] w-[250px] px-3 h-fit right-[60px] bg-white rounded-[8px]'>
                    <div className='flex flex-row my-3'>
                        <img src={user.userPfp} className='w-[40px] h-[40px] rounded-[50%] mx-3'/>
                        <div className='flex flex-col'>
                            <span>{user.userName}</span>
                            <span className='text-blue-600'>View your channel</span>
                            
                        </div>
                    </div>
                    <hr className='text-gray-300'/>
                    <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300 '><FaGoogle className='mr-2'/>Google Account</span>
                    <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300'><MdOutlineSwitchAccount className='mr-2'/> Switch account</span>
                    <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300' onClick={()=>{signOutFromAccount();}}><GoSignOut className='mr-2'/> Sign out</span>
                    <hr className='text-gray-300'/>
                    <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300'><SiYoutubestudio className='mr-2'/>YouTube studio</span>
                    <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300'><CiDollar className='mr-2'/> Purchases and memberships</span>
                    <hr className='text-gray-300'/>
                    <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300'><RiShieldUserLine className='mr-2'/> Your data in YouTube</span>
                    <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300'><LuSettings className='mr-2'/> Settings</span>
                    <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300'><IoIosHelpCircleOutline className='mr-2'/> Help</span>
                </div>}
        </div>
    </div>
  )
}

export default Header