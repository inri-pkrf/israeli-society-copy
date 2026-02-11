import React from 'react';
import '../componentsCSS/VideoPageStep2.css';
import { useNavigate } from 'react-router-dom';

const SocietyVideo = ({ videoSrc, videoInfo, cactusSrc, title }) => {
  const navigate = useNavigate();

  const goToNextStep = () => {
    navigate('/TrackPage'); // תשני לנתיב שאת רוצה
  };

  return (
    <div id="videoPage" className="video-step2">

      {/* קקטוס */}
      <img
        className="cactus-img"
        src={cactusSrc}
        alt={title}
      />

      {/* חצי עיגול + כותרת */}
      <div className="circle-div-video">
        <h1 className="page-title-video">{title}</h1>
      </div>

      {/* טקסט מידע */}
      {videoInfo && (
        <p className="video-info2">{videoInfo}</p>
      )}

      {/* וידאו */}
      <video className="video-play" controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* כפתור */}
      <button
        className="next-step-button-2"
        onClick={goToNextStep}
        style={{  cursor: 'pointer' }}
      >
        לשלב הבא
      </button>

    </div>
  );
};

export default SocietyVideo;
