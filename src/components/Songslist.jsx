import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SongCard from "./SongCard";

const Songslist = ({ Songs, scrollRef }) => {
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-out-cubic" });
  }, []);

  return (
    <div className="w-full min-h-screen p-4 sm:p-6  text-white">
      
    
      <h1 className="sticky top-0 z-30 bg-black/80 backdrop-blur text-4xl md:text-5xl mb-4 py-4 font-extralight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 text-center font-[Pacifico]">
        Recommended Songs
      </h1>

     
      <div
        ref={scrollRef}
        className="max-h-[80vh] bg-white/ overflow-y-auto scroll-mt-24 rounded-2xl backdrop-blur-lg shadow-inner p-4 sm:p-6 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent scrollbar-hide"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {Songs.map((song, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              <SongCard
                song={song}
                isPlaying={currentlyPlayingIndex === index}
                wasPlaying={currentlyPlayingIndex !== null}
                onPlay={() => setCurrentlyPlayingIndex(index)}
                onStop={() => setCurrentlyPlayingIndex(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Songslist;
