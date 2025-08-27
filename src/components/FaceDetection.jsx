import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const FaceDetection = ({ setSongs }) => {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");
  const [cameraStarted, setCameraStarted] = useState(false);
  const [expressionScores, setExpressionScores] = useState({});


  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);
    };
    loadModels();
  }, []);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setCameraStarted(true);
      })
      .catch((err) => {
        console.error("Camera error:", err);
        alert("Unable to access camera.");
      });
  };

  const detectOnce = async () => {
    const video = videoRef.current;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      setExpression("No face detected");
      setExpressionScores({});
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
    setExpressionScores(expObj);

    axios
      .get(`http://localhost:3000/songs?mood=${result}`)
      .then((response) => {
        setSongs(response.data.songs);
      });
  };

  return (
    <div className="w-full flex justify-center items-center p-6 bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center gap-6 border border-white/10">
        
        {/* Video feed */}
        <video
          ref={videoRef}
          autoPlay
          muted
          width="300"
          height="300"
          className="rounded-2xl shadow-md border border-white/20"
          style={{ display: cameraStarted ? "block" : "none" }}
        />

        {/* Open Camera Button */}
        {!cameraStarted && (
          <button
            onClick={startCamera}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
          >
            Open Camera
          </button>
        )}

        {/* Detect Mood Button */}
        {cameraStarted && (
          <button
            onClick={detectOnce}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
          >
            Detect Mood
          </button>
        )}

        {/* Result Display */}
        {expression && (
          <p className="text-lg text-white font-semibold">
            Detected Mood:{" "}
            <span className="text-yellow-300 capitalize">{expression}</span>
          </p>
        )}       
      </div>
    </div>
  );
};

export default FaceDetection;
