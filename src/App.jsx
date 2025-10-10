import { Children, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, createBrowserRouter, RouterProvider,Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import CurrentPlayingVideo from './Components/CurrentPlayingVideo'
import MainLayout from './LayoutComponents/MainLayout'
import SigninPage from './Components/SigninPage'
import SignupPage from './Components/SignupPage';
import YoutubeStudio from './Components/YoutubeStudio'

function App() {

  const [hamburger,setHamburger]=useState(false);
  const [signedIn,setSignedIn]=useState(false);
  const [user,setUser]=useState(null);
  useEffect(()=>{
    if(localStorage.getItem("userInfo")!=null)
  {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    setSignedIn(true);
  }
  },[])
  
  const appRouter=createBrowserRouter([
    {
      element:(<MainLayout setHamburger={setHamburger} hamburger={hamburger} signedIn={signedIn} setSignedIn={setSignedIn} user={user}/>),
      children:[
        {
          path: "/",
          element: <Home signedIn={signedIn} hamburger={hamburger} />,
        },
        {
          path: "/currentplayingvideo/:id",
          element: <CurrentPlayingVideo />,
        }
      ]
    },
    {
          path:"/signin",
          element:<SigninPage setSignedIn={setSignedIn} user={user} setUser={setUser}/>
    },
    {
      path:"/signup",
      element:<SignupPage/>
    },
    {
      path:"/youtubestudio",
      element:<YoutubeStudio user={user} setUser={setUser}/>
    }
  ])
  

  return (
    <RouterProvider router={appRouter} />
  );
}

export default App
