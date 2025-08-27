import React, { useState } from 'react'

const Songslist = ({Songs}) => {

  const[isPlaying, setIsPlaying]=useState(null)
   
  const handlePlayPause=(index)=>{
    if(isPlaying===index){
      setIsPlaying(null)
    }else{
      setIsPlaying(index)
    }
  }
  return (
    <div className='w-[100%] p-10 '>
        <h1 className='text-3xl mb-5'>Recommended Songs</h1>
        {Songs.map((song,index)=>(
            <div className='flex justify-between' key={index}>
                <div>
                  <h2>{song.title}</h2>
                  <p>{song.artist}</p>
                </div>
                <div> 
                  { isPlaying===index &&
                  <audio src={song.audio} style={{display:'none'}}
                  autoPlay={isPlaying===index}>
                  </audio>
                 } 
                  <button onClick={()=>handlePlayPause(index)}>
                  {isPlaying===index?  <i className="ri-pause-circle-line"></i>
                    :<i className="ri-play-circle-line"></i>}
                  </button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Songslist