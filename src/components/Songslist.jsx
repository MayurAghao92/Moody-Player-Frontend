import React, { useState, useRef, useEffect } from "react";

const SongCard = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * duration;

    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-5 flex flex-col gap-4 text-white hover:scale-105 transition-transform duration-300">
      <div>
        <h2 className="text-xl font-semibold truncate">{song.title}</h2>
        <p className="text-sm text-gray-200">{song.artist}</p>
      </div>

      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Progress Bar */}
      <div className="flex flex-col gap-1">
        <div
          className="w-full h-2 bg-gray-400/30 rounded-full cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-pink-400 rounded-full"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <div className="text-sm flex justify-between text-gray-200">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play / Pause */}
      <button
        onClick={handlePlayPause}
        className="text-pink-400 hover:text-pink-600 text-4xl self-end transition"
      >
        {isPlaying ? (
          <i className="ri-pause-circle-line"></i>
        ) : (
          <i className="ri-play-circle-line"></i>
        )}
      </button>
    </div>
  );
};

const Songslist = ({ Songs }) => {
  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-b from-purple-700 via-indigo-800 to-purple-900">
      <h1 className="text-3xl md:text-4xl mb-6 font-bold text-white text-center">
        Recommended Songs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Songs.map((song, index) => (
          <SongCard key={index} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Songslist;
