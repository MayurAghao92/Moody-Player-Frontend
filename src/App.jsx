import { useState, useRef, useEffect } from "react";
import FaceDetection from "./components/FaceDetection";
import "./App.css";
import Songslist from "./components/Songslist";
import Header from "./components/Header";

function App() {
  const [Songs, setSongs] = useState([]);
  const recommendationsRef = useRef(null);
  const [mood, setMood] = useState("neutral");
  const [backgroundClass, setBackgroundClass] = useState(
    "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
  );

  // Dynamic background based on detected mood
  useEffect(() => {
    const moodBackgrounds = {
      happy: "bg-gradient-to-br from-yellow-600 via-orange-700 to-red-800",
      sad: "bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900",
      angry: "bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700",
      surprised: "bg-gradient-to-br from-purple-800 via-pink-700 to-red-600",
      fearful: "bg-gradient-to-br from-gray-900 via-slate-800 to-black",
      disgusted: "bg-gradient-to-br from-green-900 via-emerald-800 to-teal-700",
      neutral:
        "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900",
    };

    setBackgroundClass(moodBackgrounds[mood] || moodBackgrounds.neutral);
  }, [mood]);

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${backgroundClass} text-white font-[Poppins] transition-all duration-1000`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col space-y-12 p-4 sm:p-6">
        <Header />

        <main className="space-y-16">
          <section className="container mx-auto">
            <FaceDetection
              setSongs={setSongs}
              recommendationsRef={recommendationsRef}
            />
          </section>

          <section className="container mx-auto">
            <Songslist Songs={Songs} scrollRef={recommendationsRef} />
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-white/50 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 text-sm">
            <i className="ri-code-line"></i>
            <span>Built with React, Face-API.js & AI</span>
            <i className="ri-heart-line text-red-400"></i>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
