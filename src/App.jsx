import { useState } from 'react'
import FaceDetection from './components/FaceDetection'
import './App.css'
import Songslist from './components/Songslist'

function App() {
   const [Songs,setSongs]=useState([
      
    ]);


  return (
    <div className='w-screen h-screen bg-gray-700'>
      <FaceDetection setSongs={setSongs}/>
      <Songslist Songs={Songs}/>
    </div>
      
    
  )
}

export default App
