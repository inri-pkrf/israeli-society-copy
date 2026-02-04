import React from 'react';
import '../componentsCSS/VideoPageStep2.css';

const VideoPageStep2 = ({ videoSrc, videoInfo, textContent, titleContent, onNextStep }) => {

  const goToNextStep = () => {
    if (onNextStep) {
      onNextStep(); 
    }
  };

  return (
    <div className="video-step2">
      <p className='video-info2'>{videoInfo}</p>
      <div className='video-content'>
        <h2>{titleContent}</h2>
        <p>{textContent}</p>
      </div>
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
