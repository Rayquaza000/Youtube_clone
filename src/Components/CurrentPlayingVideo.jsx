import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchOneVideo from "../CustomHooks/useFetchOneVideo";
import { BiLike, BiDislike } from "react-icons/bi";
import {
  PiDotsThreeOutlineVerticalFill,
  PiShareFatLight,
  PiDotsThreeOutlineFill,
} from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { HiScissors } from "react-icons/hi";
import VideoSelections from "./VideoSelections";
import { MdOutlineSort } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TiTick } from "react-icons/ti";

function CurrentPlayingVideo({ signedIn, setSignedIn, user, setUser }) {
  const params = useParams();
  const todaysDate = new Date();
  const oneVideo = useFetchOneVideo(params.id);

  const [videosData, setVideosData] = useState(null);
  const [moreOpened, setMoreOpened] = useState(false);
  const [decideRowOrColumn, setDecideRowOrColumn] = useState("col");
  const [hideDownloadAndClip, setHideDownloadAndClip] = useState(0);
  const [showCommentButtons, setShowCommentButtons] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showEditAndDelete, setShowEditAndDelete] = useState(-1);
  const [comments, setComments] = useState([]);
  const [indexOfCommentToEdit, setIndexOfCommentToEdit] = useState(-1);

  /** -------------------- Load Video Comments -------------------- **/
  useEffect(() => {
    if (oneVideo && oneVideo.comments) {
      setComments(oneVideo.comments);
    }
  }, [oneVideo]);

  /** -------------------- Restore Signed-in User -------------------- **/
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
      setSignedIn(true);
    }
  }, []);

  /** -------------------- Responsive Layout Adjustments -------------------- **/
  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth > 1023) setDecideRowOrColumn("row");
      else setDecideRowOrColumn("col");

      if (window.innerWidth > 1024 && window.innerWidth < 1191)
        setHideDownloadAndClip(2);
      else if (window.innerWidth > 1190 && window.innerWidth < 1260)
        setHideDownloadAndClip(1);
      else setHideDownloadAndClip(0);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  /** -------------------- Upload Comment -------------------- **/
  async function uploadComment() {
    try {
      const requestoptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
        body: JSON.stringify({
          userID: user.userID,
          userName: user.userName,
          text: commentText,
          userPfp: user.userPfp,
          videoID: params.id,
        }),
      };

      const response = await fetch("http://localhost:5100/uploadcomment", requestoptions);
      if (response.status !== 200) throw new Error(response.status);

      const json_response = await response.json();
      setComments((prev) => [...prev, json_response.userData]);
      setCommentText("");
    } catch (error) {
      console.log("Error uploading comment:", error);
    }
  }

  /** -------------------- Delete Comment -------------------- **/
  async function deleteThisComment(comID, index) {
    try {
      const responseoptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
        body: JSON.stringify({ videoID: params.id }),
      };

      const response = await fetch(
        `http://localhost:5100/deleteThisComment/${comID}`,
        responseoptions
      );
      if (response.status !== 200) throw new Error(response.status);
      await response.json();
      setComments((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  }

  /** -------------------- Fetch Related Videos -------------------- **/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5100/homeVideos");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setVideosData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  //Edit selected comment
  async function editSelectedComment(comID,text)
  {
    try {
      const requestoptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
        body: JSON.stringify({ videoID: params.id,text:text }),
      };
      const response=await fetch(`http://localhost:5100/editThisComment/${comID}`,requestoptions);
      if(!response.ok)
      {
        throw new Error(response.error);
      }
      const json_response=await response.json();
      console.log("comment successfully updated");
    }
    catch(error)
    {
        console.log(error);
    }
  }
  /** -------------------- Loading State -------------------- **/
  if (!oneVideo)
    return (
      <div className="w-full flex justify-center items-center h-[80vh]">
        Loading...
      </div>
    );

  const videoUploadDate = new Date(oneVideo.uploadDate);
  const videoUploadDateInMilli = videoUploadDate.getTime();

  /** -------------------- Render Layout -------------------- **/
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-8 gap-4">
      {/* LEFT SIDE — VIDEO + COMMENTS */}
      <div className="flex flex-col lg:col-span-5 lg:pl-20">
        {/* -------------------- Video Section -------------------- */}
        <iframe
          src={oneVideo.videoURL}
          allowFullScreen
          title="video"
          className="w-full aspect-video rounded-[10px]"
        />
        <span className="text-[20px] font-bold mt-2">{oneVideo.title}</span>

        {/* Channel Info + Buttons */}
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-row items-center mt-2">
            <img
              src={oneVideo.channelProfilePicture}
              className="rounded-full w-[40px] h-[40px] mr-3"
            />
            <div className="flex flex-col">
              <span className="text-[14px] font-bold">
                {oneVideo.channelName}
              </span>
              <span className="text-[12px]">
                {oneVideo.subscribers > 1000
                  ? oneVideo.subscribers > 1000000
                    ? oneVideo.subscribers / 1000000 + "M"
                    : oneVideo.subscribers / 1000 + "k"
                  : oneVideo.subscribers}{" "}
                subscribers
              </span>
            </div>
            <button className="w-[100px] h-[40px] bg-black rounded-[30px] text-white ml-4">
              Subscribe
            </button>
          </div>

          {/* Like/Share/etc */}
          <div className="flex flex-row mt-4 flex-wrap">
            <button className="flex flex-row bg-gray-200 rounded-l-[30px] items-center px-3 h-[40px] font-bold text-[12px]">
              <BiLike className="mr-2" />
              {oneVideo.likes}
            </button>
            <button className="flex flex-row bg-gray-200 rounded-r-[30px] items-center px-3 h-[40px] font-bold text-[12px]">
              <BiDislike />
            </button>
            <button className="flex flex-row bg-gray-200 rounded-[20px] px-3 h-[40px] ml-2 font-bold text-[12px] items-center">
              <PiShareFatLight className="mr-2" /> Share
            </button>
            {hideDownloadAndClip < 2 && (
              <button className="flex flex-row bg-gray-200 rounded-[20px] px-3 h-[40px] ml-2 font-bold text-[12px] items-center">
                <LiaDownloadSolid className="mr-2" /> Download
              </button>
            )}
            {hideDownloadAndClip < 1 && (
              <button className="flex flex-row bg-gray-200 rounded-[20px] px-3 h-[40px] ml-2 font-bold text-[12px] items-center">
                <HiScissors className="mr-2" /> Clip
              </button>
            )}
            <button className="flex flex-row bg-gray-200 rounded-[20px] px-3 h-[40px] ml-2 font-bold text-[12px] items-center">
              <PiDotsThreeOutlineFill />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col bg-gray-300 rounded-[10px] p-2 mt-4">
          <div className="flex flex-row">
            <span className="font-bold">
              {oneVideo.views} views
            </span>
            &nbsp;&nbsp;
            <span className="font-bold">
              {parseInt(
                (todaysDate.getTime() - videoUploadDateInMilli) /
                  (24 * 60 * 60 * 1000)
              )}{" "}
              days ago
            </span>
          </div>
          <div className="h-fit mt-2">
            {oneVideo.description.length >= 120 ? (
              moreOpened ? (
                <span>
                  {oneVideo.description}{" "}
                  <span
                    className="font-bold cursor-pointer"
                    onClick={() => setMoreOpened(false)}
                  >
                    show less
                  </span>
                </span>
              ) : (
                <span>
                  {oneVideo.description.slice(0, 119)}...
                  <span
                    className="font-bold cursor-pointer"
                    onClick={() => setMoreOpened(true)}
                  >
                    more
                  </span>
                </span>
              )
            ) : (
              <span>{oneVideo.description}</span>
            )}
          </div>
        </div>

        {/* -------------------- Comments Section -------------------- */}
        <div className="w-full flex flex-col mt-8 sm:px-3 md:px-7">
          <div className="flex flex-row items-center mb-4">
            <span className="font-bold text-[20px]">
              {comments.length} comments
            </span>
            <button className="flex flex-row ml-4 items-center">
              <MdOutlineSort className="w-[25px] h-[25px]" /> Sort by
            </button>
          </div>

          {/* Add Comment Input */}
          <div className="flex flex-row items-start mb-6">
            {!signedIn && <CgProfile className="w-[40px] h-[40px]" />}
            {signedIn && (
              <img
                src={user?.userPfp}
                className="w-[50px] h-[50px] rounded-full"
              />
            )}
            <div className="flex flex-col w-full ml-3">
              <input
                type="text"
                placeholder="Add a comment..."
                disabled={!signedIn}
                className="border-b border-gray-300 outline-none focus:border-black w-full"
                onFocus={() => setShowCommentButtons(true)}
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
              {showCommentButtons && (
                <div className="flex justify-end mt-2">
                  <button
                    className="mx-2"
                    onClick={() => setShowCommentButtons(false)}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!commentText.trim()}
                    className="px-2 py-1 bg-blue-600 rounded-[15px] text-white disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={uploadComment}
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Comment List */}
          {comments.map((data, index) => {
            const commentDateInMilli = data.timestamp;

            function editComment(e) {
              data.text = e.target.innerText;
            }

            return (
              <div className="flex flex-row my-2 w-full" key={index}>
                <img
                  src={data?.userPfp}
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="flex flex-col ml-3 w-full">
                  <div className="flex flex-row items-end">
                    <span className="font-bold text-[14px]">
                      @{data.userName}
                    </span>
                    &nbsp;
                    <span className="text-[12px] text-gray-400 font-bold">
                      {parseInt(
                        (Date.now() - commentDateInMilli) /
                          (24 * 60 * 60 * 1000)
                      )}{" "}
                      days ago
                    </span>
                  </div>
                  <div className="flex flex-row items-center">
                    <span
                      className="line-clamp-3"
                      contentEditable={indexOfCommentToEdit === index}
                      suppressContentEditableWarning={true}
                      onInput={(e) => editComment(e)}
                    >
                      {data.text}
                    </span>
                    {indexOfCommentToEdit === index && (
                      <TiTick
                        className="w-[20px] h-[20px] ml-2 cursor-pointer"
                        onClick={() => {
                          setIndexOfCommentToEdit(-1);
                          editSelectedComment(data.commentID,data.text);
                          console.log("Edited text:", data.text);
                        }}
                      />
                    )}
                  </div>
                  <div className="flex flex-row mt-2">
                    <BiLike className="w-[20px] h-[20px] mr-3" />
                    <BiDislike className="w-[20px] h-[20px] mr-3" />
                    <span className="text-[14px] font-bold">Reply</span>
                  </div>
                </div>

                {/* 3-dot menu */}
                <div className="relative ml-auto">
                  <PiDotsThreeOutlineVerticalFill
                    className="cursor-pointer"
                    onClick={() => {
                      if (showEditAndDelete === index) setShowEditAndDelete(-1);
                      else {
                        if (indexOfCommentToEdit === index)
                          setShowEditAndDelete(-1);
                        else setShowEditAndDelete(index);
                      }
                    }}
                  />
                  {showEditAndDelete === index && (
                    <div className="absolute flex flex-col w-fit h-fit top-0 right-[20px] rounded-[5px] shadow-2xl border border-gray-300 bg-white">
                      <button
                        className="px-3 py-1 hover:bg-gray-300 disabled:text-gray-400"
                        disabled={data.userID !== user.userID}
                        onClick={() => {
                          setShowEditAndDelete(-1);
                          setIndexOfCommentToEdit(index);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 hover:bg-gray-300 disabled:text-gray-400"
                        disabled={data.userID !== user.userID}
                        onClick={() => {
                          setShowEditAndDelete(-1);
                          deleteThisComment(data.commentID, index);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE — RELATED VIDEOS */}
      <div className="flex flex-col justify-start h-fit sm:px-3 md:px-3 lg:col-span-3">
        {videosData &&
          videosData.map((data, index) => (
            <VideoSelections
              alignment={decideRowOrColumn}
              key={index}
              videoID={data.videoID}
              title={data.title}
              thumbnailURL={data.thumbnailURL}
              channelName={data.channelName}
              channelProfilePicture={data.channelProfilePicture}
              views={data.views}
              daysAgo={parseInt(
                (todaysDate.getTime() - videoUploadDateInMilli) /
                  (24 * 60 * 60 * 1000)
              )}
            />
          ))}
      </div>
    </div>
  );
}

export default CurrentPlayingVideo;
