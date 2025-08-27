import React, { useState } from "react";
import SongCard from "./SongCard"; 

const Songslist = ({ Songs }) => {
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-b from-purple-700 via-indigo-800 to-purple-900">
      <h1 className="text-3xl md:text-4xl mb-6 font-bold text-white text-center font-[Pacifico]">
        Recommended Songs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Songs.map((song, index) => (
          <SongCard
            key={index}
            song={song}
            isPlaying={currentlyPlayingIndex === index}
            onPlay={() => setCurrentlyPlayingIndex(index)}
            onStop={() => setCurrentlyPlayingIndex(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default Songslist;
