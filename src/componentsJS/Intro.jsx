
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../componentsCSS/Intro.css';

const Intro = () => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const navigate = useNavigate();

  // הצגת כפתור דילוג אחרי 3.5 שניות
  useEffect(() => {
    const skipButtonTimeout = setTimeout(() => {
      setShowSkipButton(true);
    }, 3500);

    return () => clearTimeout(skipButtonTimeout);
  }, []);

  const skipVideo = () => {
    setIsVideoEnded(true);
  };

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
  };

  useEffect(() => {
    if (isVideoEnded) {
      setShowIntro(true);
    }
  }, [isVideoEnded]);

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div id="intro-lomda">
      {!isVideoEnded && (
        <>
          {showSkipButton && (
            <button 
              className="skip" 
              onClick={skipVideo}
              aria-label="דלג על הסרטון"
            >
              &lt;&lt; דלג/י
            </button>
          )}
          <video 
            className="video-intro" 
            autoPlay 
            muted 
            playsInline
            onEnded={handleVideoEnd}
          >
            <source 
              src={`${process.env.PUBLIC_URL}/assets/media/introVidComp.mp4`} 
              type="video/mp4" 
              media="(min-width: 769px)" 
            />
            <source 
              src={`${process.env.PUBLIC_URL}/assets/media/introVid.mp4`} 
              type="video/mp4" 
              media="(max-width: 768px)" 
            />
            Your browser does not support the video tag.
          </video>
        </>
      )}

      {showIntro && (
        <div className="intro-text-slide-in">
          <img 
            src={`${process.env.PUBLIC_URL}/assets/imgs/whiteLogo.svg`} 
            alt="White Logo" 
            id="logo-white" 
            className="move-to-center" 
          />
          <h1 id="sub-title">החברה הישראלית</h1>
          <p id="introduction-sub">
            ברוכים הבאים והבאות לשיעור הדיגיטלי על רבדי החברה הישראלית, או - כל מה שרציתם לדעת ולא העזתם לשאול על החברה החרדית, הערבית, קשישים ואנשים עם מוגבלויות
          </p>
          <img
            src={`${process.env.PUBLIC_URL}/assets/imgs/whiteNextBtn.png`}
            className="hpArrow-intro"
            alt="Arrow"
            onClick={goToHome} 
          />
        </div>
      )}
    </div>
  );
};

export default Intro;
