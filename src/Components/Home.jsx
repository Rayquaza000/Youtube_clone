import React, { useEffect, useState } from "react";
import VideoSelections from "./VideoSelections";
import useWindowSize from "../CustomHooks/useWindowSize";

const Home = ({ signedIn, hamburger }) => {
  const { width } = useWindowSize();
  const [videosData, setVideosData] = useState([]);
  const [filterCategories, setFilterCategories] = useState(["All"]);
  const [selectedFilter,setSelectedFilter]=useState("All");
  const todaysDate = new Date();

  /** -------------------- DYNAMIC WIDTH CLASSES -------------------- **/
  let homeWidth = "";
  let filterWidth = "";
  let videosWidth = "";

  if (width <= 767) {
    //  Mobile layout
    homeWidth = "flex flex-col w-full min-h-[calc(100vh-80px-15px)] md:mr-auto pl-3";
    filterWidth = "flex flex-row flex-wrap gap-2 w-full my-3 px-4 overflow-x-auto scrollbar-none";
    videosWidth = "flex flex-wrap justify-start w-full min-h-[calc(100vh-80px)]";
  } else {
    //  Desktop layout
    const baseWidth = hamburger ? "calc(100vw-250px-15px)" : "calc(100vw-33px-15px)";
    homeWidth = `flex flex-col flex-1 w-[${baseWidth}] min-h-[calc(100vh-80px)] md:mr-auto pl-3`;
    filterWidth = `flex flex-row flex-wrap gap-2 flex-1 w-[${baseWidth}] my-3 px-4 overflow-x-auto scrollbar-none`;
    videosWidth = `flex flex-wrap justify-start w-[${baseWidth}] min-h-[calc(100vh-80px)]`;
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
  return (<div>
    <div className={homeWidth}>
      {/* Filter Bar */}
      <div className={filterWidth}>
        {filterCategories.map((element, index) => (
  <span
    key={index}
    className={`whitespace-nowrap flex-shrink-0 w-fit h-fit px-3 py-1 rounded-[8px] cursor-pointer transition 
      ${selectedFilter === element ? "bg-gray-800 text-white" : "bg-gray-300 hover:bg-gray-400"}`}
    onClick={() => setSelectedFilter(element)}>
    {element}
  </span>
))}
      </div>

      {/* Videos Section */}
      <div className={videosWidth}>
        {filteredVideos.map((data, index) => {
          const videoUploadDate = new Date(data.uploadDate);
          const daysAgo = parseInt((todaysDate.getTime() - videoUploadDate.getTime()) /(24 * 60 * 60 * 1000));
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
    </div>
  );
};

export default Home;
