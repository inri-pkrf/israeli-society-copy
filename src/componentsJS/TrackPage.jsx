import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../componentsCSS/TrackPage.css";
import stepsData from "../data/stepsData";
import videoData from "../data/videoData";
import SocietyHeader from "./SocietyHeader";
import DragGame from "./DragGame";
import DragTextMatch from "./DragTextMatch";

const TrackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prompt =
    location.state?.prompt || sessionStorage.getItem("currentPrompt");

  const companyData = videoData[prompt];

  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const [dragTextMatchCompleted, setDragTextMatchCompleted] = useState(false);
  const [dragGameCompleted, setDragGameCompleted] = useState(false);

  const companySteps =
    stepsData[prompt] || stepsData[Object.keys(stepsData)[0]];

  const allCompleted = completedSteps.length === companySteps.length;

  const showDragTextMatch = activeStep === 2 && prompt === "החברה הערבית";
  const showFullscreenStep4 = activeStep === 4 && prompt === "החברה החרדית";

  useEffect(() => {
    if (!prompt || !companyData) {
      navigate("/subChosing");
    }
  }, [prompt, companyData, navigate]);

  if (!companyData) return null;

  const handleClick = (stepId) => {
    if (stepId === 1 || completedSteps.includes(stepId - 1)) {
      setActiveStep(stepId);
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps((prev) => [...prev, stepId]);
      }
    }
  };

  const goToNextStep = () => {
    if (activeStep < companySteps.length) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      if (!completedSteps.includes(nextStep)) {
        setCompletedSteps((prev) => [...prev, nextStep]);
      }
    }
  };

  /* ── shared header rendered inside every backdrop ── */
  const ReadingHeader = () => (
    <div className="reading-header">
      <img src={companyData.imgSrc} alt={prompt} className="reading-header-img" />
    </div>
  );

  return (
    <div id="TrackPage" className={activeStep ? "reading-open" : ""}>
      <SocietyHeader imgSrc={companyData.imgSrc} title={prompt} />

      <div
        className={`track-container ${
          prompt === "החברה הערבית" ? "arabic-company" : ""
        }`}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/imgs/rode.png`}
          alt="rode"
          id="rode-img"
        />
        {companySteps.map((step) => {
          const isUnlocked =
            step.id === 1 || completedSteps.includes(step.id - 1);
          const isCompleted = completedSteps.includes(step.id);

          return (
            <div
              key={step.id}
              className={`track-circle ${!isUnlocked ? "locked" : ""} ${
                isCompleted ? "completed" : ""
              }`}
              onClick={() => handleClick(step.id)}
            >
              <div className="circle-number">{step.id}</div>
              <div className="circle-text">{step.textInCircle}</div>
            </div>
          );
        })}
      </div>

      {/* ── Regular reading steps ── */}
      {activeStep !== null &&
        companySteps[activeStep - 1] &&
        !showDragTextMatch &&
        !showFullscreenStep4 && (
          <div className="reading-backdrop">
            <ReadingHeader />

            <button
              className="reading-close"
              onClick={() => setActiveStep(null)}
            >
              ×
            </button>

            <div className="reading-box">
              <h1 className="number-box">{activeStep}</h1>
              <h2>{companySteps[activeStep - 1].title}</h2>
              <p dangerouslySetInnerHTML={{ __html: companySteps[activeStep - 1].text }} />
            </div>

            {activeStep < companySteps.length && (
              <button className="arrow-btn" onClick={goToNextStep}>
                ›
              </button>
            )}
          </div>
        )}

      {/* ── Step 2 – DragTextMatch ── */}
      {showDragTextMatch && (
        <div className="reading-backdrop">
          <ReadingHeader />

          <button
            className="reading-close"
            onClick={() => setActiveStep(null)}
          >
            ×
          </button>

          <div className="reading-box game-page">
            <h1 className="number-box">{activeStep}</h1>
            <h2>{companySteps[activeStep - 1].title}</h2>

            <DragTextMatch
              onComplete={() => {
                setDragTextMatchCompleted(true);
                if (!completedSteps.includes(2)) {
                  setCompletedSteps((prev) => [...prev, 2]);
                }
              }}
            />
          </div>

          {dragTextMatchCompleted && activeStep < companySteps.length && (
            <button className="arrow-btn" onClick={goToNextStep}>
              ›
            </button>
          )}
        </div>
      )}

      {/* ── Step 4 – DragGame ── */}
      {showFullscreenStep4 && (
        <div className="reading-backdrop">
          <ReadingHeader />

          <button
            className="reading-close"
            onClick={() => setActiveStep(null)}
          >
            ×
          </button>

          <div className="reading-box game-page">
            <h1 className="number-box">{activeStep}</h1>
            <h2>{companySteps[activeStep - 1].title}</h2>
            <p>{companySteps[activeStep - 1].text}</p>

            <DragGame
              onComplete={() => {
                setDragGameCompleted(true);
                if (!completedSteps.includes(4)) {
                  setCompletedSteps((prev) => [...prev, 4]);
                }
              }}
            />
          </div>

          {dragGameCompleted && activeStep < companySteps.length && (
            <button className="arrow-btn" onClick={goToNextStep}>
              ›
            </button>
          )}
        </div>
      )}

      {allCompleted && (
        <button
          className="next-step-button-2 track-page"
          onClick={() => {
            navigate("/video-page", {
              state: { prompt, from: "track-page", videoIndex: 1 },
            });
          }}
        >
          המשך
        </button>
      )}
    </div>
  );
};

export default TrackPage;