import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/TrackPage.css';
import stepsData from '../data/stepsData';
import videoData from '../data/videoData';
import SocietyHeader from './SocietyHeader';
import DragGame from './DragGame';
import DragTextMatch from './DragTextMatch';

const TrackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prompt =
    location.state?.prompt || sessionStorage.getItem('currentPrompt');

  const companyData = videoData[prompt];

  useEffect(() => {
    if (!prompt || !companyData) {
      navigate('/subChosing');
    }
  }, [prompt, companyData, navigate]);

  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (stepId) => {
    if (stepId === 1 || completedSteps.includes(stepId - 1)) {
      setActiveStep(stepId);
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps((prev) => [...prev, stepId]);
      }
    }
  };

  const companySteps =
    stepsData[prompt] || stepsData[Object.keys(stepsData)[0]];

  const allCompleted =
    completedSteps.length === companySteps.length;

  if (!companyData) return null;

  const showDragTextMatch =
    activeStep === 2 && prompt === "החברה הערבית";

  const showDragGame =
    activeStep === 4 && prompt === "החברה החרדית";

  return (
    <div id="TrackPage">

      {/* 🔹 מסך מלא אמיתי לשלב DragTextMatch */}
      {showDragTextMatch && activeStep !== null ? (
        <div className="fullscreen-stage">

          <button
            className="reading-close"
            onClick={() => setActiveStep(null)}
          >
            ×
          </button>

          <h2>{companySteps[activeStep - 1].title}</h2>
          <p>{companySteps[activeStep - 1].text}</p>

          {!isLandscape ? (
            <div className="rotate-screen">
              <h2>נא לסובב את המכשיר לרוחב 📱</h2>
            </div>
          ) : (
            <DragTextMatch
              onComplete={() => {
                if (!completedSteps.includes(2)) {
                  setCompletedSteps((prev) => [...prev, 2]);
                }
              }}
            />
          )}

        </div>
      ) : (
        <>
          <SocietyHeader
            imgSrc={companyData.imgSrc}
            title={prompt}
          />

          <img
            src={`${process.env.PUBLIC_URL}/assets/imgs/rode.png`}
            alt="rode"
            id="rode-img"
          />

          <div
            className={`track-container${
              prompt === "החברה הערבית"
                ? " arabic-company"
                : ""
            }`}
          >
            {companySteps.map((step) => {
              const isUnlocked =
                step.id === 1 ||
                completedSteps.includes(step.id - 1);

              const isCompleted =
                completedSteps.includes(step.id);

              return (
                <div
                  key={step.id}
                  className={`track-circle ${
                    !isUnlocked ? 'locked' : ''
                  } ${isCompleted ? 'completed' : ''}`}
                  onClick={() => handleClick(step.id)}
                >
                  <div className="circle-number">
                    {step.id}
                  </div>
                  <div className="circle-text">
                    {step.textInCircle}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🔹 מודאל רגיל לשאר השלבים */}
          {activeStep !== null &&
            companySteps[activeStep - 1] && (
              <>
                <div
                  className="reading-backdrop"
                  onClick={() =>
                    setActiveStep(null)
                  }
                />

                <div className="reading-box">
                  <button
                    className="reading-close"
                    onClick={() =>
                      setActiveStep(null)
                    }
                  >
                    ×
                  </button>

                  <h2>
                    {companySteps[activeStep - 1].title}
                  </h2>

                  <p>
                    {companySteps[activeStep - 1].text}
                  </p>

                  {showDragGame && (
                    <DragGame
                      onComplete={() => {
                        if (
                          !completedSteps.includes(4)
                        ) {
                          setCompletedSteps(
                            (prev) => [...prev, 4]
                          );
                        }
                      }}
                    />
                  )}
                </div>
              </>
            )}

          {allCompleted && (
            <button
              className="next-step-button-2 track-page"
              onClick={() =>
                navigate('/video-page', {
                  state: {
                    prompt,
                    videoIndex: 0,
                    next: '/society-questions',
                  },
                })
              }
            >
              המשך
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TrackPage;
