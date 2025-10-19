import React, { useEffect, useState } from "react";
import VideoSelections from "./VideoSelections";
import useWindowSize from "../CustomHooks/useWindowSize";

const Home = ({ signedIn, hamburger }) => {
  const { width } = useWindowSize();
  const [videosData, setVideosData] = useState([]);
  const [filterCategories, setFilterCategories] = useState(["All"]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const todaysDate = new Date();

  /** -------------------- DYNAMIC WIDTH STYLES -------------------- **/
  let homeStyle = {};
  let filterStyle = {};
  let videosStyle = {};

  if (width <= 767) {
    // Mobile layout
    homeStyle = {
      width: "100%",
      minHeight: "calc(100vh - 80px - 15px)",
      paddingLeft: "12px",
    };
    filterStyle = { width: "100%" };
    videosStyle = { width: "100%" };
  } else {
    // Desktop layout
    const baseWidth = hamburger
      ? "calc(100vw - 250px - 15px)" // when sidebar is open
      : "calc(100vw - 33px - 15px)"; // when sidebar is collapsed

    homeStyle = {
      width: baseWidth,
      minHeight: "calc(100vh - 80px)",
      paddingLeft: "12px",
      transition: "width 0.3s ease",
    };
    filterStyle = { width: baseWidth, transition: "width 0.3s ease" };
    videosStyle = { width: baseWidth, transition: "width 0.3s ease" };
  }

  /** -------------------- FETCH HOME VIDEOS -------------------- **/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5100/homeVideos");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setVideosData(result);
      } catch (error) {
        console.log("Error fetching videos:", error);
      }
    };
    fetchData();
  }, []);

  /** -------------------- BUILD FILTER CATEGORIES -------------------- **/
  useEffect(() => {
    if (!videosData.length) return;

    const categories = new Set(["All"]);
    videosData.forEach((video) => {
      if (video.category) categories.add(video.category);
    });

    setFilterCategories(Array.from(categories));
  }, [videosData]);

  const filteredVideos =
    selectedFilter === "All"
      ? videosData
      : videosData.filter((video) => video.category === selectedFilter);

  /** -------------------- RENDER -------------------- **/
  return (
    <div className="flex flex-col md:mr-auto" style={homeStyle}>
      {/* Filter Bar */}
      <div
        className="flex flex-row flex-wrap gap-2 my-3 px-4 overflow-x-auto scrollbar-none"
        style={filterStyle}
      >
        {filterCategories.map((element, index) => (
          <span
            key={index}
            className={`whitespace-nowrap flex-shrink-0 w-fit h-fit px-3 py-1 rounded-[8px] cursor-pointer transition 
              ${
                selectedFilter === element
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            onClick={() => setSelectedFilter(element)}
          >
            {element}
          </span>
        ))}
      </div>

      {/* Videos Section */}
      <div
        className="flex flex-wrap justify-start min-h-[calc(100vh-80px)]"
        style={videosStyle}
      >
        {filteredVideos.map((data, index) => {
          const videoUploadDate = new Date(data.uploadDate);
          const daysAgo = parseInt(
            (todaysDate.getTime() - videoUploadDate.getTime()) /
              (24 * 60 * 60 * 1000)
          );

          return (
            <VideoSelections
              alignment="col"
              key={index}
              videoID={data.videoID}
              title={data.title}
              thumbnailURL={data.thumbnailURL}
              channelName={data.channelName}
              channelProfilePicture={data.channelProfilePicture}
              views={data.views}
              daysAgo={daysAgo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
