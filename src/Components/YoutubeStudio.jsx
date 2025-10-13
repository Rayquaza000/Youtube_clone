import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import youtube_icon from "../assets/Youtube_icon.png";
import VideoSelections from "./VideoSelections";
import { SlHome } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { SiYoutubestudio } from "react-icons/si";
import { CiDollar } from "react-icons/ci";
import { RiShieldUserLine } from "react-icons/ri";
import { LuSettings } from "react-icons/lu";
import { IoIosHelpCircleOutline } from "react-icons/io";

function YoutubeStudio({ user, setUser,signedIn, setSignedIn }) {
  const token = localStorage.getItem("accesstoken");
  const [hamburger, setHamburger] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [channelVideos, setChannelVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [description, setDescription] = useState("");
  const [newChannelForm, setNewChannelForm] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDesc, setNewChannelDesc] = useState("");
  const [newChannelPfp, setNewChannelPfp] = useState("");
  const [channelCreationMsg, setChannelCreationMsg] = useState("");
  const [showProfile,setShowProfile]=useState(false);
  const [category,setCategory]=useState("");
  const navigate=useNavigate();
  const todaysDate = new Date();

  /** -------------------- INITIALIZATION -------------------- **/
 useEffect(() => {
    // Try getting user from props first
    if (user && user.channels?.length) {
      const savedChannel = localStorage.getItem("currentChannel");
      let selectedChannelID = savedChannel;

      // If no saved channel or saved one doesn’t belong to this user
      const userChannelIDs = user.channels.map(ch => ch.channelID);
      if (!selectedChannelID || !userChannelIDs.includes(selectedChannelID)) {
        selectedChannelID = user.channels[0].channelID;
        localStorage.setItem("currentChannel", selectedChannelID);
      }

      setDropdownValue(selectedChannelID);
      localStorage.setItem("userInfo", JSON.stringify(user)); // keep synced
      return;
    }

    // If user prop not yet available, try restoring from localStorage
    const localUser = JSON.parse(localStorage.getItem("userInfo"));
    if (localUser?.channels?.length) {
      setUser(localUser);
      const savedChannel = localStorage.getItem("currentChannel") || localUser.channels[0].channelID;
      localStorage.setItem("currentChannel", savedChannel);
      setDropdownValue(savedChannel);
    }
  }, [user]);

  /** -------------------- FETCH VIDEOS WHEN USER + CHANNEL READY -------------------- **/
  // 🧠 One clear responsibility: fetch videos for the current channel
useEffect(() => {
  if (!dropdownValue || !token) return;

  async function fetchChannelVideos() {
    try {
      console.log(dropdownValue);
      const response = await fetch(
        `http://localhost:5100/getVideosOfChannel/${dropdownValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChannelVideos(data.videos || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  }

  // Call it
  fetchChannelVideos();
}, [dropdownValue, token]);


  /** -------------------- HANDLE WINDOW RESIZE -------------------- **/
  useEffect(() => {
    const handleResize = () => {
      setBackdrop(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** -------------------- UPLOAD VIDEO -------------------- **/
  async function uploadVideoToSystem() {
    try {
      const response2 = await fetch(
        `http://localhost:5100/getChannelFromChannelID/${dropdownValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }

      const channelData = await response2.json();

      const response = await fetch("http://localhost:5100/uploadVideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoURL,
          title,
          thumbnailURL,
          description,
          category,
          channelID: dropdownValue,
          channelName: channelData.channelName,
          channelProfilePicture: channelData.userProfilePicture,
          uploader: channelData.userName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json_response = await response.json();
      console.log(json_response.message);

      // reload videos after upload
      setTimeout(() => setDropdownValue(dropdownValue), 500);
    } catch (err) {
      console.error("Upload error:", err);
    }
  }

  /** -------------------- CREATE NEW CHANNEL -------------------- **/
  async function createNewChannel() {
    try {
      const response = await fetch("http://localhost:5100/createChannel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          channelName: newChannelName,
          channelDescription: newChannelDesc,
          channelProfilePicture: newChannelPfp,
          userID: user.userID,
        }),
      });

      if (!response.ok) {
        setChannelCreationMsg("Channel creation failed");
        setTimeout(() => {
          setNewChannelForm(false);
          setChannelCreationMsg("");
        }, 3000);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json_response = await response.json();
      console.log(json_response);
      setChannelCreationMsg("New channel created. Your current channel is now set to the new channel.");

      setTimeout(() => {
        setNewChannelForm(false);
        setChannelCreationMsg("");
      }, 3000);

      // ✅ Refresh user data to include new channel
      const response3 = await fetch(
        `http://localhost:5100/getUserByID/${user.userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response3.ok){
        throw new Error(`HTTP error! status: ${response3.status}`);
      }
      const updatedUser = await response3.json();
      setUser(updatedUser);
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));

      // ✅ set new current channel and trigger refresh
      const lastChannel =
        updatedUser.channels[updatedUser.channels.length - 1];
      setDropdownValue(lastChannel.channelID);
      localStorage.setItem("currentChannel", lastChannel.channelID);
      setChannelVideos([]); // clear previous videos
    } catch (err) {
      console.error("Create channel error:", err);
    }
  }

  function signOutFromAccount(){
    setUser(null);
    setSignedIn(false);
    localStorage.clear();
    navigate("/");
  }

  /** -------------------- RENDER -------------------- **/
  return (
    <div className="flex flex-col w-full h-full">
      {/* Create Channel Modal */}
      {newChannelForm && (
        <div className="flex flex-row bg-[rgba(60,60,60,0.5)] justify-center items-center z-10 fixed top-0 left-0 w-screen h-screen">
          <div className="flex flex-col bg-white w-fit h-fit p-4">
            <div className="flex flex-row justify-between w-full h-full items-center my-4">
              <span className="text-[20px]">New Channel</span>
              <IoMdClose onClick={() => setNewChannelForm(false)} />
            </div>
            <span>Channel Name:</span>
            <input
              type="text"
              className="w-[400px] h-[40px] mb-3 rounded-[5px] border border-black px-2"
              onChange={(e) => setNewChannelName(e.target.value)}
              value={newChannelName}
            />
            <span>Channel Description:</span>
            <input
              type="text"
              className="w-[400px] h-[40px] mb-3 rounded-[5px] border border-black px-2"
              onChange={(e) => setNewChannelDesc(e.target.value)}
              value={newChannelDesc}
            />
            <span>Channel Profile Picture Link:</span>
            <input
              type="text"
              className="w-[400px] h-[40px] mb-3 rounded-[5px] border border-black px-2"
              onChange={(e) => setNewChannelPfp(e.target.value)}
              value={newChannelPfp}
            />
            <span
              className={
                channelCreationMsg === "New channel created. Your current channel is now set to the new channel."
                  ? "text-green-700 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {channelCreationMsg}
            </span>
            <button
              className="w-fit h-fit px-4 py-2 rounded-[20px] bg-black text-white self-end"
              onClick={createNewChannel}
            >
              Create Channel
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-row h-[80px] items-center shadow-md z-5 justify-between">
        <div className="flex flex-row h-full items-center">
          <GiHamburgerMenu
            className="w-[25px] h-[40px] ml-[30px]"
            onClick={() => setHamburger(!hamburger)}
          />
          <img src={youtube_icon} className="w-[35px] h-[20px] ml-[15px]" />
          <span className="font-bold text-[20px]">Studio</span>
        </div>
        <div  className="flex flex-row items-center justify-end">
        <button
          className="mr-3 px-3 py-2 bg-gray-300 font-medium rounded-[20px] hover:bg-gray-400"
          onClick={() => setNewChannelForm(true)}
        >
          New channel
        </button>
        <img src={user?.userProfilePicture} className='w-[30px] h-[30px] mr-[20px] rounded-[50%]' onClick={()=>{setShowProfile(!showProfile)}}></img>
        {showProfile && <div className='flex flex-col absolute shadow-sm shadow-black top-[20px] w-[250px] px-3 h-fit right-[60px] bg-white rounded-[8px]'>
                            <div className='flex flex-row my-3'>
                                <img src={user.userProfilePicture} className='w-[40px] h-[40px] rounded-[50%] mx-3'/>
                                <div className='flex flex-col'>
                                    <span>{user.userName}</span>
                                    <span className='text-blue-600'>View your channel</span>
                                    
                                </div>
                            </div>
                            <hr className='text-gray-300'/>
                            <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300 '><FaGoogle className='mr-2'/>Google Account</span>
                            <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300'><MdOutlineSwitchAccount className='mr-2'/> Switch account</span>
                            <span className='flex flex-row items-center my-1 rounded-[5px] px-3 py-1 hover:bg-gray-300' onClick={()=>{signOutFromAccount();}}><GoSignOut className='mr-2' /> Sign out</span>
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

      {/* Main Content */}
      <div className="flex flex-col w-[100%] h-[100%] flex-grow relative">
        <div className="flex flex-row w-[100%] h-[100%]">
          {/* Sidebar */}
          {hamburger && (
            <div className="absolute flex flex-col w-[250px] h-full z-3 items-center bg-white border-r border-gray-300 lg:static">
              <img
                src={user?.userProfilePicture}
                className="w-[100px] h-[100px] rounded-full mt-5"
              />
              <span className="font-medium">Your channel</span>
              <select
                onChange={(e) => {
                  setDropdownValue(e.target.value);
                  localStorage.setItem("currentChannel", e.target.value);
                }}
                className="text-center"
                value={dropdownValue}
              >
                {user?.channels?.map((ch, i) => (
                  <option key={i} value={ch.channelID}>
                    {ch.channelName}
                  </option>
                ))}
              </select>
                <button className='active:bg-gray-100 rounded-[5px] flex flex-row items-center p-1 px-6 mt-5 hover:bg-gray-100' onClick={()=>{navigate("/")}}><SlHome className='w-[20px] h-[20px] -translate-y-[3px] '/><span className='ml-[20px]'>Youtube Home</span></button>
            </div>
          )}

          {/* Dashboard */}
          <div className="w-[100%] flex flex-col p-5">
            <span className="text-[24px] font-medium">Channel Dashboard</span>
            <div className="flex flex-col border border-gray-300 rounded-[15px] justify-center px-3 py-5">
              <span>Title:</span>
              <input
                type="text"
                className="w-full px-2 h-[50px] border border-gray-500 rounded-[10px]"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <span className="mt-5">Video URL:</span>
              <input
                type="text"
                className="w-full px-2 h-[50px] border border-gray-500 rounded-[10px]"
                placeholder="Video URL"
                onChange={(e) => setVideoURL(e.target.value)}
                value={videoURL}
              />
              <span className="mt-5">Thumbnail URL:</span>
              <input
                type="text"
                className="w-full px-2 h-[50px] border border-gray-500 rounded-[10px]"
                placeholder="Thumbnail URL"
                onChange={(e) => setThumbnailURL(e.target.value)}
                value={thumbnailURL}
              />
              <span className="mt-5">Description:</span>
              <input
                type="text"
                className="w-full px-2 h-[50px] border border-gray-500 rounded-[10px]"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <span className="mt-5">Video Category:</span>
              <input
                type="text"
                className="w-full px-2 h-[50px] border border-gray-500 rounded-[10px]"
                placeholder="Video Category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
              <button
                className="bg-black text-white px-3 py-2 rounded-[15px] mt-5"
                onClick={uploadVideoToSystem}
              >
                Upload Video
              </button>
            </div>

            {/* Videos */}
            <div className="flex flex-row flex-wrap justify-between px-2 py-4">
              {channelVideos?.map((v, i) => {
                const videoUploadDate = new Date(v.uploadDate);
                const daysAgo = Math.floor(
                  (todaysDate.getTime() - videoUploadDate.getTime()) /
                    (24 * 60 * 60 * 1000)
                );
                return (
                  <VideoSelections
                    key={i}
                    alignment="col"
                    videoID={v.videoID}
                    title={v.title}
                    thumbnailURL={v.thumbnailURL}
                    channelName={v.channelName}
                    channelProfilePicture={v.channelProfilePicture}
                    views={v.views}
                    daysAgo={daysAgo}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {hamburger && backdrop && (
          <div className="absolute w-full h-full bg-[rgba(60,60,60,0.5)] z-2"></div>
        )}
      </div>
    </div>
  );
}

export default YoutubeStudio;
