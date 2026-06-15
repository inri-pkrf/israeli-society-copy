import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCSS/Intro.css';

const Intro = () => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const navigate = useNavigate();

  // Pick video source based on screen width
  const isMobile = window.innerWidth <= 768;
  const videoSrc = isMobile
    ? `${process.env.PUBLIC_URL}/assets/media/introVid.mp4`
    : `${process.env.PUBLIC_URL}/assets/media/introVidComp.mp4`;

  useEffect(() => {
    const skipButtonTimeout = setTimeout(() => {
      setShowSkipButton(true);
    }, 3500);
    return () => clearTimeout(skipButtonTimeout);
  }, []);

  const skipVideo = () => setIsVideoEnded(true);
  const handleVideoEnd = () => setIsVideoEnded(true);

  useEffect(() => {
    if (isVideoEnded) setShowIntro(true);
  }, [isVideoEnded]);

  // Fallback: if video fails to load/play, skip to intro
  const handleVideoError = () => setIsVideoEnded(true);

  const goToHome = () => navigate('/home');

  return (
    <div id="intro-lomda">

      {/* Video section */}
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
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="auto"
            onEnded={handleVideoEnd}
            onError={handleVideoError}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </>
      )}

      {/* Intro text */}
      {showIntro && (
        <div className="intro-text-slide-in">
          <div className="intro-inner">
            <div className="logo-wrapper">
              <img
                src={`${process.env.PUBLIC_URL}/assets/imgs/whiteLogo.svg`}
                alt="White Logo"
                id="logo-white"
              />
            </div>

            <div className="title-wrapper">
              <h1 id="sub-title">החברה הישראלית</h1>
            </div>

            <div className="divider" />

            <div className="text-wrapper">
              <p id="introduction-sub">
                ברוכים הבאים והבאות לשיעור הדיגיטלי על רבדי החברה הישראלית, או - כל מה
                שרציתם ורציתן לדעת ולא העזתם לשאול על החברה החרדית, הערבית, בני ובנות הגיל השלישי
                ואנשים עם מוגבלויות
              </p>
            </div>

            <div className="arrow-wrapper">
              <img
                src={`${process.env.PUBLIC_URL}/assets/imgs/whiteNextBtn.png`}
                className="hpArrow-intro"
                alt="Arrow"
                onClick={goToHome}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Intro;