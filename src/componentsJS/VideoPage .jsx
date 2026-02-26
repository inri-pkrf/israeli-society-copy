import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/VideoPage.css';
import secondPart from '../data/videoData';
import VideoPageStep2 from './VideoPageStep2';
import Questions from './Questions'; // <-- שימי לב שזה צריך להיות שם הקומפוננטה שלך
import SocietyHeader from '../componentsJS/SocietyHeader';


const VideoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoPageRef = useRef(null); // <<<<<< הוספה

  const prompt = location.state?.prompt;

  useEffect(() => {
    if (prompt) {
      sessionStorage.setItem('currentPrompt', prompt);
    }
  }, [prompt]);
  const companyData = secondPart[prompt];

  useEffect(() => {
    if (!prompt || !companyData) {
      navigate('/subChosing');
    }
  }, [prompt, companyData, navigate]);

const handleNextStep = () => {
  if (!companyData) return;

  const from = location.state?.from || "unknown";
  const videoIndex = location.state?.videoIndex || 0;

  console.log("PROMPT:", prompt);
  console.log("FROM:", from);

  // ===============================
  // החברה הערבית / החרדית
  // ===============================
  if (prompt === "החברה הערבית" || prompt === "החברה החרדית") {

    // הגעתי מעמוד introduction
    if (from === "introduction-to-society") {
      navigate("/Interlude", {
        state: { prompt, from: "video-page" }
      });
      return;
    }

    // הגעתי מהמשחק (TrackPage)
    if (from === "track-page") {
      navigate("/society-questions", {
        state: { prompt }
      });
      return;
    }
  }

  // ===============================
  // הגיל השלישי
  // ===============================
  if (prompt === "הגיל השלישי") {
    // אם הגעתי ממשחק אמת או מיתוס
    if (from === "true-or-false") {
      navigate("/society-questions", {
        state: { prompt }
      });
      return;
    }
  }

  // ===============================
  // המשך סרטונים (אם יש כמה)
  // ===============================
  const videos =
    companyData.videos || [
      { src: companyData.videoSrc, info: companyData.videoInfo },
    ];

  if (videoIndex + 1 < videos.length) {
    navigate("/video-page", {
      state: {
        prompt,
        videoIndex: videoIndex + 1,
        from: from, // שומר מאיפה הגעת!
      },
    });
  } else {
    navigate("/society-questions", {
      state: { prompt }
    });
  }
};
  return (
    <div id="videoPage" ref={videoPageRef}>
    <SocietyHeader 
      imgSrc={companyData.imgSrc} 
      title={prompt} 
    />


      <VideoPageStep2
        className="video-componnet"
        videoSrc={companyData.videoSrc}
        videoInfo={companyData.videoInfo}
        onNextStep={handleNextStep}
      />

      <div className="footer-vid"></div>
    </div>
  );
};

export default VideoPage;