import { useState, useRef } from "react";
import FaceDetection from "./components/FaceDetection";
import "./App.css";
import Songslist from "./components/Songslist";
import Header from "./components/Header";

function App() {
  const [Songs, setSongs] = useState([]);
  const recommendationsRef = useRef(null);
  const [mood, setMood] = useState("neutral");

  return (
    <div
      className="min-h-screen flex flex-col space-y-12 p-4 sm:p-6 bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900  text-white"
    >
      <Header />
      <FaceDetection
        setSongs={setSongs}
        recommendationsRef={recommendationsRef}
      />
      <Songslist Songs={Songs} scrollRef={recommendationsRef} />
    </div>
  );
}

export default App;
