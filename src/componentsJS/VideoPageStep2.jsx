import React from 'react';
import '../componentsCSS/VideoPageStep2.css';

const VideoPageStep2 = ({ videoSrc, videoInfo, onNextStep }) => {

  const goToNextStep = () => {
    if (onNextStep) {
      onNextStep(); 
    }
  };

  return (
    <div className="video-step2">
      <video className='video-play ' controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        className="next-step-button-2"
        onClick={goToNextStep}
      >
        לשלב הבא
      </button>
    </div>
  );
};

export default VideoPageStep2;
