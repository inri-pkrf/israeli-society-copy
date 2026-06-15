import React, { useState, useRef } from 'react';
import '../componentsCSS/VideoPageStep2.css';

const VideoPageStep2 = ({ videoSrc, videoInfo, onNextStep }) => {
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    setShowButton(true);
  };

  return (
    <div className="video-step2">
      <video
        className="video-play"
        controls
        ref={videoRef}
        onEnded={handleVideoEnded}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {videoInfo && (
        <p className="video-info2">{videoInfo}</p>
      )}

      {showButton && (
        <button className="next-step-button-2" id="next-step-button-2-video" onClick={onNextStep}>
          לשלב הבא
        </button>
      )}
    </div>
  );
};

export default VideoPageStep2;