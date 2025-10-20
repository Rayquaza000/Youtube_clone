import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

function VideoSelections({ alignment, videoID, title, thumbnailURL, channelName, channelProfilePicture, views, daysAgo, onVideoDeleted, }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [threeDotsOpen, setThreeDotsOpen] = useState(false);

    //code to update view count when any video is clicked and opened
    async function openVideo() {
        try {
            const requestoptions = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoID }),
            };

            const response = await fetch("http://localhost:5100/incrementViewCount", requestoptions);
            if (!response.ok) {
                throw new Error(`Failed to increment view count. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error incrementing view count:", error);
        }

        navigate(`/currentplayingvideo/${videoID}`);
    }



    //code for deleting video from database
    async function deleteThisVideoFromSystem(videoID) {
        try {
            const requestoptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("accesstoken")}` },
                body: JSON.stringify({ videoID }),
            };

            const response = await fetch(`http://localhost:5100/deleteThisVideoFromSystem/${videoID}`, requestoptions);

            if (!response.ok) {
                const errText = await response.text().catch(() => "");
                throw new Error(`Failed to delete video. Status: ${response.status}. ${errText}`);
            }

            let json_response = null;
            try {
                json_response = await response.json();
            } catch {
                console.warn("Server did not return JSON, continuing...");
            }

            console.log(json_response?.message ?? "Video deleted successfully.");
            if (onVideoDeleted) onVideoDeleted(videoID);
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    }

    /** -------------------- CARD LAYOUTS -------------------- **/
    if (alignment === "col") {
        return (
            <div className="flex flex-col w-[90%] xs:w-[50%] sm:w-[50%] md:w-[350px] h-fit px-2 hover:bg-gray-300 rounded-[10px] pt-2" onClick={() => openVideo()}>
                <img src={thumbnailURL} alt={title} className="w-full h-[70%] rounded-[10px]" />

                <div className="flex flex-row my-2 relative">
                    {currentPath.startsWith("/currentplayingvideo") ? null : (
                        <img src={channelProfilePicture} className="w-[40px] h-[40px] rounded-full mr-3" alt="channel" />)}

                    <div className="flex flex-col w-[70%]">
                        <span className="line-clamp-2 font-bold">{title}</span>
                        <span className="text-gray-500">{channelName}</span>
                        <div className="flex flex-row">
                            <span className="text-gray-500 text-[13px]"> {views > 1000 ? views > 1000000 ? Math.floor(views / 1000000) + "M" : Math.floor(views / 1000) + "k" : views}{" "}
                                Views&nbsp;·
                            </span>
                            <span className="text-gray-500 text-[13px]">&nbsp;{daysAgo} days ago</span>
                        </div>
                    </div>

                    <PiDotsThreeVerticalBold
                        className="w-[20px] h-[20px] self-start ml-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); if (currentPath === "/youtubestudio") setThreeDotsOpen(!threeDotsOpen); }} />

                    {threeDotsOpen && (
                        <button className="h-fit w-fit px-2 py-2 bg-white border border-black flex flex-row items-center justify-center absolute right-[20px] shadow-2xl shadow-black rounded-md" onClick={(e) => { e.stopPropagation(); deleteThisVideoFromSystem(videoID); }}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        );
    } else if (alignment === "row") {
        return (
            <div
                className={`flex flex-row ${currentPath.startsWith("/currentplayingvideo") ? "w-[90%]" : "w-full"
                    } h-fit px-4 mb-1 hover:bg-gray-300 py-2 rounded-[10px]`}
                onClick={() => openVideo()}
            >
                <img
                    src={thumbnailURL}
                    alt={title}
                    className={`${currentPath.startsWith("/currentplayingvideo") ? "w-[60%]" : "w-[50%]"
                        } h-auto rounded-[10px]`}
                />

                <div className="flex flex-row mx-2 w-fit h-fit">
                    {!currentPath.startsWith("/currentplayingvideo") && (
                        <img
                            src={channelProfilePicture}
                            alt="channel"
                            className="w-[40px] h-[40px] rounded-full mr-3"
                        />
                    )}
                    <div className="flex flex-col">
                        <span
                            className={`line-clamp-2 font-bold ${currentPath.startsWith("/currentplayingvideo") ? "text-[14px]" : ""
                                }`}
                        >
                            {title}
                        </span>
                        <span className="text-gray-500">{channelName}</span>
                        <div className="flex flex-row">
                            <span className="text-gray-500 text-[13px]">
                                {views > 1000
                                    ? views > 1000000
                                        ? Math.floor(views / 1000000) + "M"
                                        : Math.floor(views / 1000) + "k"
                                    : views}{" "}
                                Views&nbsp;·
                            </span>
                            <span className="text-gray-500 text-[13px]">&nbsp;{daysAgo} days ago</span>
                        </div>
                    </div>

                    <PiDotsThreeVerticalBold
                        className="w-[20px] h-[20px] min-w-[20px] self-start ml-auto cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </div>
        );
    }

    return null;
}

export default VideoSelections;
