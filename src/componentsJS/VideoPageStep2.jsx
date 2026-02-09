import React, { useState } from 'react';
import '../componentsCSS/VideoPageStep2.css';
const VideoPageStep2 = ({ videoSrc, videoInfo, textContent, titleContent, slides, onNextStep }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const activeSlide = (slides && slides.length > 0) ? slides[slideIndex] : { title: titleContent, text: textContent };

  const goToNextStep = () => {
    if (onNextStep) {
      onNextStep();
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) setSlideIndex(slideIndex - 1);
  };

  const nextSlide = () => {
    if (slides && slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  return (
    <div className="video-step2">
      <p className='video-info2'>{videoInfo}</p>
      <div className='video-content'>
        <div id ="text-container">
          {slides && slides.length > 0 && (
            <div className="slide-indicator">{`${slideIndex + 1}/${slides.length}`}</div>
          )}
          <h2>{activeSlide.title}</h2>
          <p>{activeSlide.text}</p>

          {slides && slides.length > 1 && (
            <>
              {slideIndex > 0 && (
                <button className="arrow-btn arrow-left" onClick={prevSlide} aria-label="הקודם">‹</button>
              )}
              {slideIndex < slides.length - 1 && (
                <button className="arrow-btn arrow-right" onClick={nextSlide} aria-label="הבא">›</button>
              )}
            </>
          )}
        </div>
      </div>
      <button
        className="next-step-button-2"
        onClick={goToNextStep}
      >
        לשלב הבא
      </button>
    </div>
  );
};

export default VideoPageStep2;
