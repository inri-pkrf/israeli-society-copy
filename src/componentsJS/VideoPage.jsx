import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/VideoPage.css';
import secondPart from '../data/videoData';
import VideoPageStep2 from './VideoPageStep2';
import Interlude from './TrueOrFalse';
import Questions from './Questions'; // <-- שימי לב שזה צריך להיות שם הקומפוננטה שלך


const VideoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoPageRef = useRef(null); // <<<<<< הוספה

  const prompt = location.state?.prompt;
  const [showQuestions, setShowQuestions] = useState(false);
  const [showInterlude, setShowInterlude] = useState(false);

  const companyData = secondPart[prompt];

  const handleNextStep = () => {
    // show an intermediate page before displaying the questions
    setShowInterlude(true);
  };

  const continueToQuestions = () => {
    setShowInterlude(false);
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
        !showInterlude ? (
          <VideoPageStep2
            className="video-componnet"
            videoSrc={companyData.videoSrc}
            videoInfo={companyData.videoInfo}
            slides={companyData.slides}
            textContent={companyData.textContent}
            titleContent={companyData.titleContent}
            onNextStep={handleNextStep}
          />
        ) : (
          <Interlude
            title={`המשך ל${companyData.title}`}
            text={`בנוקודה זו נשאל כמה שאלות כדי לוודא הבנה. כאשר תרגישו מוכנים — לחצו להמשיך.`}
            onContinue={continueToQuestions}
          />
        )
      ) : (
        <div>
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

