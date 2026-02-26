import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/VideoPage.css';
import VideoPageStep2 from './VideoPageStep2';
import SocietyHeader from '../componentsJS/SocietyHeader';
import videoData from '../data/videoData'; // מכיל imgSrc של החברה

// -------------------------
// מיפוי סרטונים לפי חברה
// -------------------------
const videoMapping = {
  "החברה הערבית": [
    `${process.env.PUBLIC_URL}/assets/media/arabVid.mp4`,
    `${process.env.PUBLIC_URL}/assets/media/arabVid2.mp4`,
  ],
  "החברה החרדית": [
    `${process.env.PUBLIC_URL}/assets/media/dosVid.mp4`,
    `${process.env.PUBLIC_URL}/assets/media/dosVid2.mp4`,
  ],
  "מוגבלויות והגיל השלישי": [
    `${process.env.PUBLIC_URL}/assets/media/dosVid.mp4`,
    `${process.env.PUBLIC_URL}/assets/media/dosVid2.mp4`,
  ],
};

const VideoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoPageRef = useRef(null);

  const prompt = location.state?.prompt;
  const from = location.state?.from || "unknown";

  useEffect(() => {
    if (prompt) sessionStorage.setItem('currentPrompt', prompt);
  }, [prompt]);

  // ----- companyData כולל imgSrc -----
  const companyData = videoData[prompt];
  const videos = videoMapping[prompt] || [];

  useEffect(() => {
    if (!prompt || !companyData || !videos.length) {
      navigate('/subChosing');
    }
  }, [prompt, companyData, videos, navigate]);

  if (!videos.length || !companyData) return null;

  // -------------------------
  // קביעת אינדקס הסרטון להצגה לפי מקור
  // -------------------------
  let selectedVideoIndex;

  if (typeof location.state?.videoIndex === "number") {
    selectedVideoIndex = location.state.videoIndex;
  } else {
    if (from === "introduction-to-society") {
      selectedVideoIndex = 0; // סרטון ראשון
    } else if (from === "track-page") {
      selectedVideoIndex = 1; // סרטון שני
    } else {
      selectedVideoIndex = 0; // ברירת מחדל
    }
  }

  const currentVideo = videos[selectedVideoIndex];

  // -------------------------
  // ניווט לשלב הבא
  // -------------------------
  const handleNextStep = () => {
    const nextIndex = selectedVideoIndex + 1;

    if (nextIndex < videos.length) {
      // ניווט לסרטון הבא
      navigate("/video-page", {
        state: {
          prompt,
          from,
          videoIndex: nextIndex,
        },
      });
      return;
    }

    // מעבר לפי סוג החברה
    if ((prompt === "החברה הערבית" || prompt === "החברה החרדית") && from === "introduction-to-society") {
      navigate("/Interlude", { state: { prompt, from: "video-page" } });
      return;
    }

    if (prompt === "מוגבלויות והגיל השלישי" && from === "true-or-false") {
      navigate("/society-questions", { state: { prompt } });
      return;
    }

    // סיום כל הסרטונים → שאלות
    navigate("/society-questions", { state: { prompt } });
  };

  return (
    <div id="videoPage" ref={videoPageRef}>
      {/* שולח את הלוגו הנכון */}
      <SocietyHeader imgSrc={companyData.imgSrc} title={prompt} />

      <VideoPageStep2
        videoSrc={currentVideo}
        videoInfo={null}
        onNextStep={handleNextStep}
      />

      <div className="footer-vid"></div>
    </div>
  );
};

export default VideoPage;