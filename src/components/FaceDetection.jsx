import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import axios from 'axios'
const FaceDetection = ({setSongs}) => {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");

  useEffect(() => {
    const loadModelsAndStart = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);

      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch(console.error);
    };

    loadModelsAndStart();
  }, []);

  const detectOnce = async () => {
    const video = videoRef.current;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      setExpression("No face detected");
      return;
    }

    let mostProbable = 0;
    let result = "";
    const expObj = detections[0].expressions;

    for (let exp in expObj) {
      if (expObj[exp] > mostProbable) {
        mostProbable = expObj[exp];
        result = exp;
      }
    }

    setExpression(result);
    console.log(result);
    axios.get(`http://localhost:3000/songs?mood=${result}`).then(response=>{
      console.log(response.data)
      setSongs(response.data.songs)
    })
  };

  return (
  
    <div className="w-[100%] p-10 flex gap-10 items-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        width="300"
        height="300"
        className="rounded-2xl shadow-lg"
      />
      <button
        onClick={detectOnce}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Detect Mood
      </button>
    </div>
  );
};

export default FaceDetection;
