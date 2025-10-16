import React, { useEffect } from 'react'
import youtube_icon from "../assets/Youtube_icon.png";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SigninPage({setSignedIn,user,setUser}) {
    const [emailValue,setEmailValue]=useState('');
    const [passwordValue,setPasswordValue]=useState('');
    const [errorDisplay,setErrorDisplay]=useState('');
    const navigate=useNavigate();
    const [emailFound,setEmailFound]=useState(false);
    const [emailFoundStatement,setEmailFoundStatement]=useState(null);
    const [passwordFoundStatement,setPasswordFoundStatement]=useState(null);
    async function checkEmailExists(){
        const response = await fetch(`http://localhost:5100/checkAndGetEmail/${emailValue}`);
        if(response.status==404)
        {
            setEmailFound(false);
            setErrorDisplay('Email not found')
        }
        else{
            setEmailFoundStatement("Email found");
            setTimeout(()=>{
                setEmailFoundStatement(null);
                setEmailFound(true);
            },3000)
            
            setUser(await response.json());
        }
        
    }

    async function tryLoggingin(){
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: passwordValue })
        };
        const response=await fetch('http://localhost:5100/login',requestOptions);
        const decoded=await response.json();
        if(response.status!=200)
        {   setPasswordFoundStatement("Password doesnt match with this account");
            setTimeout(()=>{setPasswordFoundStatement(null);},3000);
        }
        else{
            setSignedIn(true);
            console.log(decoded.userPfp);
            setUser(decoded);
            localStorage.setItem("accesstoken",decoded.accesstoken);
            console.log(decoded);
            localStorage.setItem("userInfo",JSON.stringify(decoded));
            navigate("/");
        }   
    }

  return (
    <div className='w-[100%] h-screen flex flex-row justify-center items-center'>
        <div className="w-[100%] h-[100%] flex flex-col items-start px-10 pb-5 sm:flex-row"> 
            <div className='flex flex-row w-[100%] h-fit mt-10 sm:w-[50%]' onClick={()=>{navigate("/");}}>
                <img src={youtube_icon} className='w-[80px] h-[40px] '/>
                <span className='text-[28px] font-bold'>Youtube</span>
            </div>

            {!emailFound && <div className='flex flex-col h-[70vh] justify-start sm:mt-20 '>
                <div className='flex flex-col'>
            <span className='text-[28px] mt-4 font-medium'>Sign in</span>
            <span className='text-[20px]'>to continue to YouTube</span>
            </div>
            <div className='flex flex-col mb-auto'>
            <input type="email" className='w-[100%] h-[50px] border-1 border-black border-solid rounded-[5px] mt-10 px-3' placeholder='Email' onChange={(event)=>{setEmailValue(event.target.value)}} value={emailValue}></input>
            <span className='text-[14px] text-red-600'>{errorDisplay}</span>
            <span className='text-green-600 font-bold'>{emailFoundStatement}</span>
            <span className='text-[16px] text-blue-600 font-medium'>Forgot email?</span>
            <span className='text-[16px] mt-10'>Not your computer? Use guest mode to sign in privately.</span>
            <span className='text-[16px] text-blue-600 font-medium'>Learn more about using Guest mode.</span>
            </div>
            <div className='flex flex-row w-[100%] mt-auto justify-between'>
                <span className='text-[16px] text-blue-600 font-medium' onClick={()=>{navigate("/signup")}}>Create account</span>
                <button className=' bg-blue-600 text-white p-2 px-5 rounded-[20px]' onClick={()=>{checkEmailExists()}}>Next</button>
            </div></div>}
            
                    {emailFound && <div className='flex flex-col w-full h-[70vh] justify-start sm:mt-20 '><div className='flex flex-col'>
                        <span className='text-[28px] mt-10'>Hi {user?.userName}</span>
                        <div className='flex flex-row w-fit items-center pr-4 py-1 border-black border-1 rounded-[20px] mt-2'><img src={user?.userPfp} className='w-[25px] h-[25px] mx-2 rounded-[50%]'></img>{user?.email}</div>
                        <input type="password" className='w-[100%] h-[50px] border-1 border-black border-solid rounded-[5px] mt-10 px-3' placeholder='Password' onChange={(event)=>{setPasswordValue(event.target.value)}} value={passwordValue}/>
                        <span className='text-red-600'>{passwordFoundStatement}</span>
                    </div>
                    <div className='flex flex-row h-fit w-[100%] mt-auto justify-between'>
                        <span className='text-[16px] text-blue-600 font-medium'>Forgot Password?</span>
                        <button className=' bg-blue-600 text-white p-2 px-5 rounded-[20px]' onClick={()=>{tryLoggingin();}}>Login</button>
                    </div></div>
}
        </div>
    </div>
  )
}

export default SigninPage