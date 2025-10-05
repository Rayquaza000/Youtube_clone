import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, createBrowserRouter, RouterProvider,Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import CurrentPlayingVideo from './Components/CurrentPlayingVideo'

function App() {

  const [hamburger,setHamburger]=useState(false);
  const [signedIn,setSignedIn]=useState(false);

  // const appRouter = createBrowserRouter([
  //   {
  //     path:"/",
  //     element: (<><Sidebar hamburger={hamburger}/> <Home signedIn={signedIn} hamburger={hamburger}/></>)
  //   },
  //   {
  //     path:"/currentplayingvideo/:id",
  //     element:(<><Sidebar hamburger={hamburger}/> <CurrentPlayingVideo/></>)
  //   }
  // ]);

  

  return (
    <div>
      <BrowserRouter>
      <Header setHamburger={setHamburger} hamburger={hamburger} signedIn={signedIn} setSignedIn={setSignedIn}/>
      <div className='flex flex-row h-fit'>
        
        {/* <RouterProvider router={appRouter}/> */}
        <Routes>
          <Route path="/" element={<><Sidebar hamburger={hamburger}/><Home signedIn={signedIn} hamburger={hamburger}/></>}></Route>
          <Route path="/currentplayingvideo/:id" element={<><Sidebar hamburger={hamburger}/><CurrentPlayingVideo/></>}></Route>
          
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App
