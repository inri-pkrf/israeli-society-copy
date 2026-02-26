// VideoPageStep2.jsx
import React from 'react';
import '../componentsCSS/VideoPageStep2.css';

const VideoPageStep2 = ({ videoSrc, videoInfo, onNextStep }) => {
  return (
    <div className="video-step2">
      <video className="video-play" controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="video-info">{videoInfo}</p>
      <button className="next-step-button-2" onClick={onNextStep}>
        לשלב הבא
      </button>
    </div>
  );
};

export default VideoPageStep2;