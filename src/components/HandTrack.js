import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useNavigate } from 'react-router-dom';
import 'carbon-components/css/carbon-components.css';
import './HandTrack.css';

const HandTrack = () => {
  const videoRef = useRef(null);
  const demoVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVideo, setIsVideo] = useState(false);
  const [model, setModel] = useState(null);
  const [updateNote, setUpdateNote] = useState('Loading model ..');
  const [pausedTime, setPausedTime] = useState(0);
  const [pt, setPt] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;

    tf.loadLayersModel('/path_to_your_model/model.json').then(lmodel => {
      setModel(lmodel);
      setUpdateNote('Loaded Model!');
    });

    const savedPausedTime = localStorage.getItem('pausedTime');
    const savedPt = localStorage.getItem('pt');
    if (savedPausedTime) {
      video.currentTime = parseFloat(savedPausedTime);
      setPausedTime(parseFloat(savedPausedTime));
    }

    if (savedPt) {
      setPt(parseFloat(savedPt));
    }

    return () => {
      if (isVideo) {
        stopVideo(video);
      }
    };
  }, [isVideo]);

  const startVideoHandler = () => {
    const videoElement = videoRef.current;
    const savedPausedTime = pt; 
    console.log(pt);
    if (savedPausedTime) {
      demoVideoRef.current.currentTime = savedPausedTime;
    }

    startVideo(videoElement).then(status => {
      if (status) {
        setUpdateNote('Video started. Now tracking');
        setIsVideo(true);
        demoVideoRef.current.play();
        runDetection();
      } else {
        setUpdateNote('Please enable video');
      }
    }).catch(error => {
      console.error('Error starting video:', error);
      setUpdateNote('Error starting video');
    });
  };

  const stopVideoHandler = () => {
    stopVideo(videoRef.current);
    setIsVideo(false);
    setUpdateNote('Video stopped');
    const currentTime = demoVideoRef.current.currentTime;
    setPt(currentTime);
    localStorage.setItem('pt', currentTime); 
    demoVideoRef.current.pause();

    console.log(currentTime);

    navigate('/doubt');
  };

  const startOverHandler = () => {
    setPt(0);
    localStorage.setItem('pt', 0); 
    setUpdateNote('Starting over');
  };

  const toggleVideo = () => {
    if (!isVideo) {
      setUpdateNote('Starting video');
      startVideoHandler();
    } else {
      setUpdateNote('Stopping video');
      stopVideoHandler();
    }
  };

  const runDetection = () => {
    if (!model) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const detectFrame = async () => {
      if (!isVideo) return;

      const inputTensor = tf.browser.fromPixels(video).resizeNearestNeighbor([224, 224]).expandDims(0).toFloat().div(tf.scalar(255));

      const predictions = await model.predict(inputTensor).data();

      if (predictions[0] > 0.7) { 
        stopVideoHandler();
      }


      requestAnimationFrame(detectFrame);
    };

    detectFrame();
  };

  return (
    <div className='hh'>
      <div className="p20">
        <h1>Virtual session by Team Berserk</h1>
      </div>
      <div className="mb10">
        <button onClick={toggleVideo} className="glow-on-hover" type="button">
          Toggle Video
        </button>
        <button onClick={startOverHandler} className="glow-on-hover" type="button">
          Start Over
        </button>
        <div className="updatenote mt10">{updateNote}</div>
      </div>
      <div className='vid'>
        <video className="videobox canvasbox" autoPlay playsInline ref={videoRef}></video>
        <div className="mainvid"><video className="videobox" playsInline loop src="/demo.mp4" ref={demoVideoRef}></video></div>
        <canvas id="canvas" className="border canvasbox" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default HandTrack;
