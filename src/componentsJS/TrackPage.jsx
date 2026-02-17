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

  /* הגדרת השלבים */
  const companySteps =
    stepsData[prompt] || stepsData[Object.keys(stepsData)[0]];

  const allCompleted =
    completedSteps.length === companySteps.length;

  const showDragTextMatch =
    activeStep === 2 && prompt === "החברה הערבית";

  const showFullscreenStep4 =
    activeStep === 4 && prompt === "החברה החרדית";

  /* ניווט אם אין נתונים */
  useEffect(() => {
    if (!prompt || !companyData) {
      navigate("/subChosing");
    }
  }, [prompt, companyData, navigate]);

  /* ביטול גלילה רק בשלב 4 */
  useEffect(() => {
    if (showFullscreenStep4) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFullscreenStep4]);

  if (!companyData) return null;

  const handleClick = (stepId) => {
    if (stepId === 1 || completedSteps.includes(stepId - 1)) {
      setActiveStep(stepId);

      if (!completedSteps.includes(stepId)) {
        setCompletedSteps((prev) => [...prev, stepId]);
      }
    }
  };

  return (
    <div id="TrackPage">

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
                !isUnlocked ? "locked" : ""
              } ${isCompleted ? "completed" : ""}`}
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

      {/* שלבים רגילים */}
      {activeStep !== null &&
        companySteps[activeStep - 1] &&
        !showDragTextMatch &&
        !showFullscreenStep4 && (
          <>
            <div
              className="reading-backdrop"
              onClick={() => setActiveStep(null)}
            />

            <div className="reading-box">
              <button
                className="reading-close"
                onClick={() => setActiveStep(null)}
              >
                ×
              </button>

              <h2>
                {companySteps[activeStep - 1].title}
              </h2>

              <p>
                {companySteps[activeStep - 1].text}
              </p>
            </div>
          </>
        )}

      {/* שלב 2 רגיל */}
      {showDragTextMatch && (
        <>
          <div
            className="reading-backdrop"
            onClick={() => setActiveStep(null)}
          />

          <div className="reading-box">
            <button
              className="reading-close"
              onClick={() => setActiveStep(null)}
            >
              ×
            </button>

            <h2>
              {companySteps[activeStep - 1].title}
            </h2>

            <DragTextMatch
              onComplete={() => {
                if (!completedSteps.includes(2)) {
                  setCompletedSteps((prev) => [...prev, 2]);
                }
              }}
            />
          </div>
        </>
      )}

      {/* שלב 4 – מסך מלא אבל עם אותו עיצוב */}
      {showFullscreenStep4 && (
        <>
          <div
            className="reading-backdrop fullscreen"
            onClick={() => setActiveStep(null)}
          />

          <div className="reading-box fullscreen">

            <button
              className="reading-close"
              onClick={() => setActiveStep(null)}
            >
              ×
            </button>

            <h2>
              {companySteps[activeStep - 1].title}
            </h2>

            <p>
              {companySteps[activeStep - 1].text}
            </p>

            <DragGame
              onComplete={() => {
                if (!completedSteps.includes(4)) {
                  setCompletedSteps((prev) => [...prev, 4]);
                }
              }}
            />

          </div>
        </>
      )}



      {allCompleted && (
        <button
          className="next-step-button-2 track-page"
          onClick={() =>
            navigate("/video-page", {
              state: {
                prompt,
                videoIndex: 0,
                next: "/society-questions",
              },
            })
          }
        >
          המשך
        </button>
      )}

    </div>
  );
};

export default TrackPage;
