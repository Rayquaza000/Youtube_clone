import React from 'react';
import { NavLink } from 'react-router-dom';
import youtube_icon from "../assets/Youtube_icon.png";

function ErrorPage() {
  return (
    <div className='w-screen h-screen flex flex-col bg-red-400 items-center justify-center'>
      <div className='text-red-700 flex flex-col font-bold items-center justify-center'>
        <div className='flex flex-row'>
          <img src={youtube_icon} className='w-[200px] h-[100px]'></img>
        </div>
        <span className='text-[28px]'>Error</span>
        <span className='text-[80px]'>404</span>
        <span className='text-[28px]'>Page Not Found</span>
      </div>
      <NavLink to="/" className="text-[20px] font-medium">Click Here To Go To Home Page</NavLink>
    </div>
  )
}

export default ErrorPage