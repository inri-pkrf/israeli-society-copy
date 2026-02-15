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
  // אם יש עוד סרטונים ברשימה, נמשיך עם videoIndex++
  const videos = companyData.videos || [{ src: companyData.videoSrc, info: companyData.videoInfo }];
  
  if (location.state.videoIndex + 1 < videos.length) {
    navigate('/video-page', { 
      state: { 
        prompt,
        videoIndex: location.state.videoIndex + 1,
        next: location.state.next
      } 
    });
  } else {
    // סיום הסרטונים → נווט לעמוד הבא ב-next
    navigate(location.state.next, { state: { prompt } });
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