import React, { useRef, useState, useEffect } from "react";

const SongCard = ({ song, isPlaying, onPlay, onStop }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      if (!hasPlayed) {
        audio.currentTime = 0;
        setHasPlayed(true);
      }
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      setHasPlayed(false);
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
    <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-4 sm:p-5 flex items-center sm:flex-col sm:items-start gap-4 text-white relative overflow-hidden">
      {song.image && (
        <img
          src={song.image}
          alt={song.title}
          className="w-16 h-16 rounded-lg object-cover sm:w-full sm:h-40"
        />
      )}

      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold truncate text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 font-[Pacifico]">
          {song.title}
        </h3>
        <p className="text-sm sm:text-base truncate text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 font-[Pacifico]">
          {song.artist}
        </p>
      </div>

      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={onStop}
      />

      {isPlaying && (
        <div className="flex-shrink-0 w-40 sm:w-full space-y-2">
          
          <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden group cursor-pointer">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercentage}
              onChange={handleSeek}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex justify-between text-xs text-gray-300">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      <button
        onClick={handlePlayPause}
        className="text-pink-400 hover:text-pink-600 text-4xl sm:self-center flex-shrink-0 transition-transform transform hover:scale-110"
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
