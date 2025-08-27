import React, { useRef, useState, useEffect } from "react";

const SongCard = ({ song, isPlaying, onPlay, onStop }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onStop();
    } else {
      onPlay();
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
   <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-3 flex items-center gap-3 text-white sm:flex-col sm:items-start sm:p-5 w-full">

  <div className="flex-1 min-w-0">
    <h3 className="text-sm sm:text-lg font-semibold truncate font-[Pacifico]">{song.title}</h3>
    <p className="text-xs sm:text-sm text-gray-300 truncate font-[Pacifico]">{song.artist}</p>
  </div>

  <audio
    ref={audioRef}
    src={song.audio}
    onTimeUpdate={handleTimeUpdate}
    onLoadedMetadata={() => setDuration(audioRef.current.duration)}
    onEnded={onStop}
  />


  <div className="flex-shrink-0 w-40 sm:w-full">
    <input
      type="range"
      min="0"
      max="100"
      value={progressPercentage}
      onChange={handleSeek}
      className="w-full accent-pink-400"
    />
    <div className="flex justify-between text-xs mt-1 text-gray-300">
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(duration)}</span>
    </div>
  </div>

  <button
    onClick={handlePlayPause}
    className="text-pink-400 hover:text-pink-600 text-3xl sm:text-4xl flex-shrink-0"
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

export default SongCard;
