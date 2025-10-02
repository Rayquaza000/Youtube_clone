import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'

function App() {

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    }
  ]);

  const [hamburger,setHamburger]=useState(true);

  return (
    <div>
      <Header setHamburger={setHamburger} hamburger={hamburger}/>
      <div className='flex flex-row'>
      <Sidebar hamburger={hamburger}/>
      <div>
        <RouterProvider router={appRouter}/>
      </div>
      </div>
    </div>
  );
}

export default App
