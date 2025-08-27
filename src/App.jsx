import { useState } from 'react'
import FaceDetection from './components/FaceDetection'
import './App.css'
import Songslist from './components/Songslist'
import Header from './components/Header'
import getGradientByMood from './utils/getGradientByMood'



function App() {
   const [Songs,setSongs]=useState([
      
    ]);
  const [mood, setMood] = useState("neutral");

   const gradientClass = getGradientByMood(mood);

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b ${gradientClass} from-purple-700 via-indigo-800 to-purple-900`}>
      <Header/>
      <FaceDetection onMoodDetected={setMood} setSongs={setSongs}/>
      <Songslist Songs={Songs}/>
    </div>
      
    
  )
}

export default App
