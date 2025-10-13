import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'

function MainLayout({ hamburger, setHamburger, signedIn, setSignedIn,user,setUser }) {
  return (
    <>
    <Header setHamburger={setHamburger} hamburger={hamburger} signedIn={signedIn} setSignedIn={setSignedIn} user={user} setUser={setUser}/>
    <div className='flex flex-row h-fit w-full overflow-x-hidden'>
        <Sidebar hamburger={hamburger} user={user} signedIn={signedIn}/>
        <Outlet/>
    </div>
    </>
  )
}

export default MainLayout