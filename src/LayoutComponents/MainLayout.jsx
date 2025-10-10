import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'

function MainLayout({ hamburger, setHamburger, signedIn, setSignedIn,user }) {
  return (
    <>
    <Header setHamburger={setHamburger} hamburger={hamburger} signedIn={signedIn} setSignedIn={setSignedIn} user={user}/>
    <div className='flex flex-row h-fit'>
        <Sidebar hamburger={hamburger} user={user} signedIn={signedIn}/>
        <Outlet/>
    </div>
    </>
  )
}

export default MainLayout