import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const FaceDetection = ({ setSongs, recommendationsRef }) => {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");
  const [cameraStarted, setCameraStarted] = useState(false);
  const [expressionScores, setExpressionScores] = useState({});
  const [isDetecting, setIsDetecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);
      setIsLoading(false);
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
    setIsDetecting(true);
    const video = videoRef.current;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      setExpression("No face detected");
      setExpressionScores({});
      setIsDetecting(false);
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

    try {
      const response = await axios.get(`http://localhost:3000/songs?mood=${result}`);
      setSongs(response.data.songs);
      
      setTimeout(() => {
        recommendationsRef?.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
    
    setIsDetecting(false);
  };

  const getMoodIcon = (mood) => {
    const icons = {
      happy: "ri-emotion-happy-line",
      sad: "ri-emotion-sad-line",
      angry: "ri-emotion-angry-line",
      surprised: "ri-emotion-surprised-line",
      fearful: "ri-emotion-scared-line",
      disgusted: "ri-emotion-normal-line",
      neutral: "ri-emotion-normal-line"
    };
    return icons[mood] || "ri-emotion-line";
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: "text-yellow-400",
      sad: "text-blue-400",
      angry: "text-red-400",
      surprised: "text-purple-400",
      fearful: "text-gray-400",
      disgusted: "text-green-400",
      neutral: "text-white"
    };
    return colors[mood] || "text-white";
  };

  return (
    <div className="w-full flex justify-center items-center p-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full flex flex-col items-center gap-6 border border-white/20 shadow-2xl relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl"></div>
        
        <div className="relative z-10 w-full flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2 font-[Poppins]">
              <i className="ri-camera-line text-pink-400 mr-2"></i>
              Mood Detection
            </h2>
            <p className="text-white/70 text-sm">Let AI analyze your facial expression</p>
          </div>

          {/* Camera Section */}
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              width="320"
              height="240"
              className="rounded-2xl shadow-2xl border-2 border-white/30 transition-all duration-300"
              style={{ display: cameraStarted ? "block" : "none" }}
            />
            
            {!cameraStarted && (
              <div className="w-80 h-60 bg-white/5 rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-camera-off-line text-6xl text-white/50 mb-4"></i>
                  <p className="text-white/70">Camera not started</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!cameraStarted ? (
              <button
                onClick={startCamera}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                <i className="ri-camera-line"></i>
                {isLoading ? "Loading Models..." : "Start Camera"}
              </button>
            ) : (
              <button
                onClick={detectOnce}
                disabled={isDetecting}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                <i className={`${isDetecting ? 'ri-loader-4-line animate-spin' : 'ri-scan-line'}`}></i>
                {isDetecting ? "Detecting..." : "Detect Mood"}
              </button>
            )}
          </div>

          {/* Mood Display */}
          {expression && (
            <div className="bg-white/10 rounded-2xl p-6 w-full text-center border border-white/20">
              <div className="flex items-center justify-center gap-3 mb-3">
                <i className={`${getMoodIcon(expression)} text-3xl ${getMoodColor(expression)}`}></i>
                <div>
                  <p className="text-lg text-white font-semibold font-[Poppins]">Detected Mood</p>
                  <p className={`text-2xl font-bold capitalize ${getMoodColor(expression)}`}>
                    {expression}
                  </p>
                </div>
              </div>
              
              {Object.keys(expressionScores).length > 0 && (
                <div className="mt-4 text-sm text-white/70">
                  <p className="mb-2">Confidence Scores:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(expressionScores).map(([mood, score]) => (
                      <div key={mood} className="flex justify-between">
                        <span className="capitalize">{mood}:</span>
                        <span>{(score * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceDetection;
