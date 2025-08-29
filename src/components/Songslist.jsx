import React, { useState } from "react";
import SongCard from "./SongCard";

const Songslist = ({ Songs }) => {
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);

  return (
    <div className="w-full min-h-screen p-6 ">
      <h1 className="text-4xl md:text-4xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 text-center font-[Pacifico]">
        Recommended Songs
      </h1>
      <div className="h-[500px] overflow-y-auto px-4 py-2 scrollbar-hide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Songs.map((song, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
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
