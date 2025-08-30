import { useEffect, useState } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full sticky top-0 z-50 text-center py-8 backdrop-blur-md bg-black/20 border-b border-white/10 rounded-2xl">
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 tracking-wide drop-shadow-2xl font-[Pacifico] mb-2 animate-pulse">
          Moody <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Player</span>
        </h1>
        <div className="flex items-center justify-center gap-2 text-white/70 text-lg font-[Poppins]">
          <i className="ri-music-2-line text-pink-400"></i>
          <span>Live Mood Detection & Music Recommendations</span>
          <i className="ri-emotion-line text-cyan-400"></i>
        </div>
        <div className="mt-4 w-32 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 mx-auto rounded-full opacity-80"></div>
      </div>
    </div>
  );
};

export default Header;
