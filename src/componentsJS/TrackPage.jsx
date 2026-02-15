import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/TrackPage.css';
import stepsData from '../data/stepsData';
import videoData from '../data/videoData';
import SocietyHeader from './SocietyHeader';

const TrackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prompt = location.state?.prompt || sessionStorage.getItem('currentPrompt');
  const companyData = videoData[prompt];

  useEffect(() => {
    if (!prompt || !companyData) {
      navigate('/subChosing');
    }
  }, [prompt, companyData, navigate]);

  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleClick = (stepId) => {
    console.log('Clicked step:', stepId);
    if (stepId === 1 || completedSteps.includes(stepId - 1)) {
      console.log('Setting activeStep to:', stepId);
      setActiveStep(stepId);
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps([...completedSteps, stepId]);
      }
    }
  };

  const allCompleted = completedSteps.length === stepsData.length;

  if (!companyData) return null;

  return (
    <div id="TrackPage">
      <SocietyHeader imgSrc={companyData.imgSrc} title={prompt} />

      <img src={`${process.env.PUBLIC_URL}/assets/imgs/rode.png`} alt="rode" id="rode-img" />

      <div className="track-container">
        {stepsData.map((step) => {
          const isUnlocked = step.id === 1 || completedSteps.includes(step.id - 1);
          const isCompleted = completedSteps.includes(step.id);

          return (
            <div
              key={step.id}
              className={`track-circle ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => handleClick(step.id)}
            >
              <div className="circle-number">{step.id}</div>
              <div className="circle-text">{step.textInCircle}</div>
            </div>
          );
        })}
      </div>

      {activeStep !== null && stepsData[activeStep - 1] && (
        <>
          <div className="reading-backdrop" onClick={() => setActiveStep(null)} />
          <div className="reading-box">
            <button 
              className="reading-close"
              onClick={() => setActiveStep(null)}
              aria-label="סגור"
            >
              ×
            </button>
            <h2>{stepsData[activeStep - 1].title || 'כותרת'}</h2>
            <p>{stepsData[activeStep - 1].text || 'אין תיאור'}</p>
          </div>
        </>
      )}

    {allCompleted && (
    <button 
        className="next-step-button-2 track-page" 
        onClick={() => navigate('/video-page', { 
        state: { 
            prompt,
            videoIndex: 0,        // סרטון ראשון של VideoPage השני
            next: '/society-questions'  // אחרי הסרטון הזה נגיע לשאלות
        } 
        })}
    >
        המשך
    </button>
    )}

    </div>
  );
};

export default TrackPage;
