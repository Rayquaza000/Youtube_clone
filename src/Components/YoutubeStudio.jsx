import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import youtube_icon from "../assets/Youtube_icon.png";
import VideoSelections from "./VideoSelections";

function YoutubeStudio({ user, setUser }) {
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
  const todaysDate = new Date();

  /** -------------------- INITIALIZATION -------------------- **/
  useEffect(() => {
    const userFromLocal = JSON.parse(localStorage.getItem("userInfo"));
    const currentChannelID = localStorage.getItem("currentChannel");

    // If user not in prop but exists locally
    if (!user && userFromLocal) {
      setUser(userFromLocal);
    }

    // Only run when user data is available
    if (userFromLocal?.channels?.length) {
      let selectedChannelID = currentChannelID;

      if (!selectedChannelID) {
        selectedChannelID = userFromLocal.channels[0].channelID;
        localStorage.setItem("currentChannel", selectedChannelID);
      }

      setDropdownValue(selectedChannelID);
    }
  }, [user, setUser]);

  /** -------------------- FETCH VIDEOS WHEN USER + CHANNEL READY -------------------- **/
  useEffect(() => {
    async function getVideosForChannel() {
      if (!dropdownValue || !token) return;

      try {
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

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setChannelVideos(data.videos || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    }

    if (dropdownValue && user) getVideosForChannel();
  }, [dropdownValue, user, token]);

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
      setChannelCreationMsg("New channel created");

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

      if (!response3.ok)
        throw new Error(`HTTP error! status: ${response3.status}`);

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
                channelCreationMsg === "New channel created"
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
        <button
          className="mr-3 px-3 py-2 bg-gray-300 font-medium rounded-[20px] hover:bg-gray-400"
          onClick={() => setNewChannelForm(true)}
        >
          New channel
        </button>
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
