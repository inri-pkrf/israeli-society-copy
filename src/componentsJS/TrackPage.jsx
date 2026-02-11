import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCSS/TrackPage.css';
import stepsData from '../data/stepsData';

const TrackPage = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleClick = (stepId) => {
    if (stepId === 1 || completedSteps.includes(stepId - 1)) {
      setActiveStep(stepId);
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps([...completedSteps, stepId]);
      }
    }
  };

  const allCompleted = completedSteps.length === stepsData.length;

  return (
    <div id="TrackPage">
        <img src={`${process.env.PUBLIC_URL}/assets/imgs/rode.png`} alt="rode" id="rode-img" />
      <div className="track-container">
        {stepsData.map((step) => {
          const isUnlocked = step.id === 1 || completedSteps.includes(step.id - 1);
          const isCompleted = completedSteps.includes(step.id);

          return (
            <div
              key={step.id}
              className={`track-circle 
                ${!isUnlocked ? 'locked' : ''} 
                ${isCompleted ? 'completed' : ''}`}
              onClick={() => handleClick(step.id)}
            >
              <div className="circle-number">{step.id}</div>
              <div className="circle-text">{step.textInCircle}</div>
            </div>
          );
        })}
      </div>

      {/* אזור קריאה */}
      {activeStep && (
        <div className="reading-box">
          <h2>{stepsData[activeStep - 1].title}</h2>
          <p>{stepsData[activeStep - 1].text}</p>
        </div>
      )}

      {/* כפתור המשך */}
      {allCompleted && (
        <button
          className="next-button"
          onClick={() => navigate('/next-page')}
        >
          המשך
        </button>
      )}
    </div>
  );
};

export default TrackPage;
