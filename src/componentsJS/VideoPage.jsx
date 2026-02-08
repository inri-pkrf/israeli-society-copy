import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/VideoPage.css';
import secondPart from '../data/videoData';
import VideoPageStep2 from './VideoPageStep2';
import Questions from './Questions'; // <-- שימי לב שזה צריך להיות שם הקומפוננטה שלך


const VideoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoPageRef = useRef(null); // <<<<<< הוספה

  const prompt = location.state?.prompt;
  const [showQuestions, setShowQuestions] = useState(false);

  const companyData = secondPart[prompt];

  const handleNextStep = () => {
    setShowQuestions(true);
  };

  const goToPartThree = () => {
    navigate("/subChosing");
  };

  return (
    <div id="videoPage" ref={videoPageRef}>
      <img className="cactus-img" src={companyData.imgSrc} alt={`${prompt} logo`} />
      <div className="circle-div-video">
        <h1 className="page-title-video">{prompt}</h1>
      </div>

      {!showQuestions ? (
        <VideoPageStep2
          className="video-componnet"
          videoSrc={companyData.videoSrc}
          videoInfo={companyData.videoInfo}
          textContent={companyData.textContent}
          titleContent={companyData.titleContent}
          onNextStep={handleNextStep}
        />
      ) : (
        <div>
          <p className='Q-explain'>
            בנקודה זו נשאל כמה שאלות כדי לוודא הבנה...
          </p>
          <Questions
            questions={companyData.questions}
            startPartThree={goToPartThree}
            scrollContainerRef={videoPageRef} 
          />
        </div>
      )}

      <div className="footer-vid"></div>
    </div>
  );
};

export default VideoPage;

