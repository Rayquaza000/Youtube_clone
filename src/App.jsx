import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'

function App() {

  const [hamburger,setHamburger]=useState(true);
  const [signedIn,setSignedIn]=useState(false);

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Home signedIn={signedIn} hamburger={hamburger}/>
    }
  ]);

  

  return (
    <div>
      <Header setHamburger={setHamburger} hamburger={hamburger} signedIn={signedIn} setSignedIn={setSignedIn}/>
      <div className='flex flex-row'>
        <Sidebar hamburger={hamburger}/>
        <RouterProvider router={appRouter}/>
      </div>
    </div>
  );
}

export default App
