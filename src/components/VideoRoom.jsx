import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoRoom = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [prescription, setPrescription] = useState('');
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // Modern JS (async/await) use karke camera permission maangne ka function
  const startCamera = async () => {
    try {
      // Real WebRTC project me hum 'navigator.mediaDevices.getUserMedia' use karenge
      // Abhi hum ek fake delay simulate kar rahe hain API call jaisa
      console.log("Requesting camera access...");
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      
      setIsCameraOn(true);
      console.log("Camera access granted and video stream started.");
    } catch (error) {
      console.error("Failed to access camera:", error);
      alert("Camera permission denied!");
    }
  };

  const endCall = async () => {
    try {
      // Yahan call end karne ka server request jayega
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsCameraOn(false);
      navigate('/dashboard'); // Call end hote hi dashboard pe wapas bhej do
    } catch (error) {
      console.error("Error ending call:", error);
    }
  };

  return (
    <div className="room-container">
      {/* Left Side: Video Section */}
      <div className="video-section">
        <div className="video-feed">
          {isCameraOn ? (
            <div className="active-video-placeholder">
              <h3>Live Video Stream Active</h3>
              <p>(WebRTC Stream goes here)</p>
            </div>
          ) : (
            <div className="inactive-video">
              <h3>Camera is Off</h3>
              <p>Click "Start Call" to begin consultation</p>
            </div>
          )}
        </div>
        
        {/* Call Controls */}
        <div className="controls">
          {!isCameraOn ? (
            <button className="btn-primary" onClick={startCamera}>Start Call</button>
          ) : (
            <>
              <button className="btn-control mute-btn">Mute Mic</button>
              <button className="btn-control end-btn" onClick={endCall}>End Call</button>
            </>
          )}
        </div>
      </div>

      {/* Right Side: Doctor's Notepad / E-Prescription */}
      <div className="prescription-section">
        <h3>E-Prescription</h3>
        <textarea 
          className="prescription-pad" 
          placeholder="Doctor will type medicines and notes here..."
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        ></textarea>
        <button className="btn-primary" style={{ width: '100%', marginTop: '15px' }}>
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default VideoRoom;