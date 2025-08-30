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
    <div className="w-full min-h-screen p-4 sm:p-6 text-white">
    
      <div className="text-center mb-8">
        <div className="sticky top-20 z-30 bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <i className="ri-music-2-line text-4xl text-pink-400"></i>
            <h1 className="text-4xl md:text-5xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 font-[Pacifico]">
              Recommended Songs
            </h1>
            <i className="ri-heart-3-line text-4xl text-red-400"></i>
          </div>

          {Songs.length > 0 && (
            <div className="flex items-center justify-center gap-2 text-white/70">
              <i className="ri-playlist-line"></i>
              <span className="font-[Poppins]">
                {Songs.length} songs curated for your mood
              </span>
            </div>
          )}
        </div>
      </div>

      {Songs.length > 0 ? (
        <div
          ref={scrollRef}
          className="max-h-[80vh] bg-gradient-to-br from-white/5 to-white/10 overflow-y-auto scroll-mt-24 rounded-3xl backdrop-blur-xl shadow-2xl p-6 sm:p-8 scrollbar-thin scrollbar-thumb-pink-400/50 scrollbar-track-transparent border border-white/10 scrollbar-hide"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {Songs.map((song, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
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
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <i className="ri-emotion-line text-8xl text-white/30 mb-4"></i>
          <h3 className="text-2xl font-semibold text-white/70 mb-2 font-[Poppins]">
            No Songs Yet
          </h3>
          <p className="text-white/50 max-w-md">
            Use the mood detection above to get personalized song recommendations
            based on your facial expression!
          </p>
        </div>
      )}
    </div>
  );
};

export default Songslist;
