import React, { useEffect, useState } from 'react';
import youtube_icon from "../assets/Youtube_icon.png";
import { useNavigate } from 'react-router-dom';
function SignupPage() {
    const [nameValue,setNameValue]=useState("");
    const [emailValue,setEmailValue]=useState("");
    const [passwordValue,setPasswordValue]=useState("");  
    const [pfpValue,setPfpValue]=useState("");  
    const [signupSuccessful,setSignupSuccessful]=useState(false);
    const navigate=useNavigate();
    async function trySigningup(){
        try{
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName:nameValue,userProfilePicture:pfpValue,email:emailValue,password:passwordValue})
        };
        const response=await fetch("http://localhost:5100/signup",requestOptions);
        const decoded=await response.json();
        if(decoded.status!==201){
            console.log(decoded.err);
            console.log(decoded.message)
        }
        setSignupSuccessful(true);
    }catch(error){console.log("error");}
    }

    useEffect(()=>{
        if(signupSuccessful==true){
        setTimeout(()=>{navigate("/signin");},5000);
        }
    },[signupSuccessful]);

  return (
    <>
    <div className='w-[100%] h-screen flex flex-row justify-center items-center'>
            <div className="w-[100%] h-[100%] flex flex-col items-start px-10 pb-5 sm:flex-row"> 
                <div className='w-[100%] h-[100%] flex flex-col items-start'>
                <div className='flex flex-row w-[100%] h-fit mt-10 sm:w-[50%]' onClick={()=>{navigate("/");}}>
                    <img src={youtube_icon} className='w-[80px] h-[40px] '/>
                    <span className='text-[28px] font-bold'>Youtube</span>
                </div>    
                <span className='text-[28px] font-medium mt-2'>
                    Create a YouTube Account
                </span>
                </div>
                <div className='flex flex-col w-full h-full'>
                <div className='flex flex-col w-full h-full mt-10'>
                    <span>Enter your name</span>
                    <input type='text' className='w-[100%] h-[50px] border-1 border-black border-solid rounded-[5px] px-3' onChange={(event)=>{setNameValue(event.target.value)}} placeholder='Name'></input>
                    <span className='mt-4'>Enter your email</span>
                    <input type='email' className='w-[100%] h-[50px] border-1 border-black border-solid rounded-[5px] px-3' onChange={(event)=>{setEmailValue(event.target.value)}} placeholder='Email'></input>
                    <span className='mt-4'>Create password for your account</span>
                    <input type='password' className='w-[100%] h-[50px] border-1 border-black border-solid rounded-[5px] px-3' onChange={(event)=>{setPasswordValue(event.target.value)}} placeholder='Password'></input>
                    <span className='mt-4'>Enter link of your profile picture</span>
                    <input type='text' className='w-[100%] h-[50px] border-1 border-black border-solid rounded-[5px] px-3' onChange={(event)=>{setPfpValue(event.target.value)}} placeholder='Profile Picture link'></input>
                </div>
                <button className='mt-2 sm:mt-auto self-end bg-blue-600 text-white px-4 py-2 rounded-[20px]' onClick={()=>{trySigningup()}}>Signup</button>
                </div>
            </div>
    </div>
    {signupSuccessful && <div className='flex flex-row fixed top-0 left-0 z-5 bg-[rgba(60,60,60,0.5)] w-[100vw] h-[100vh] justify-center items-center'>
            <div className='w-[50%] h-fit bg-white px-4 py-10 rounded-[15px] border-1 border-black font-medium'>You have successfully signedup to YouTube.</div>
        </div>}
        
    </>
  )
}

export default SignupPage
