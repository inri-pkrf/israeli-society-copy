import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import videoData from '../data/videoData';
import '../componentsCSS/IntroductionToSociety.css';
import SocietyHeader from '../componentsJS/SocietyHeader';

export default function Interlude() {
  const location = useLocation();
  const navigate = useNavigate();
  const prompt = location.state?.prompt || sessionStorage.getItem('currentPrompt');
  const companyData = videoData[prompt];

  if (!prompt || !companyData) {
    navigate('/subChosing');
    return null;
  }

  const handleContinue = () => {
    // go to the true/false game before the video page
    navigate('/true-or-false', { state: { prompt } });
  };

  const handleBack = () => {
    navigate('/introduction-to-society', { state: { prompt } });
  };

  return (
    <div className="introduction-to-society">
      <SocietyHeader imgSrc={companyData.imgSrc} title={prompt} />
      <div className="intro-content">
        <h1>{companyData.title}</h1>
        <div id='TrueFalseText'>
            <h2>אמת או מיתוס</h2>
            <p>בחלק זה, יש לבחור, לגרור ולהכריע האם המידע הוא אמת או מיתוס</p>
        </div>
          <button className="next-step-button-2 True-False" onClick={handleContinue}>המשך</button>
      </div>
    </div>
  );
}
