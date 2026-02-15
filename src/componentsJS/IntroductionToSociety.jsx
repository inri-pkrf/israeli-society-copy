import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../componentsCSS/IntroductionToSociety.css';
import videoData from '../data/videoData';
import SocietyHeader from '../componentsJS/SocietyHeader';


export default function IntroductionToSociety() {
  const location = useLocation();
  const navigate = useNavigate();
  const prompt = location.state?.prompt;

  const companyData = videoData[prompt];

  useEffect(() => {
    if (!prompt || !companyData) {
      navigate('/subChosing');
    }
  }, [prompt, companyData, navigate]);

  const initialSlides = companyData?.slides ?? [
    { title: companyData?.title ?? '', text: companyData?.videoInfo ?? '' },
  ];

  const [slides] = useState(initialSlides);
  const [slideIndex, setSlideIndex] = useState(0);

  const activeSlide = slides[slideIndex] || { title: '', text: '' };

  const prevSlide = () => setSlideIndex((i) => Math.max(0, i - 1));
  const nextSlide = () => setSlideIndex((i) => Math.min(slides.length - 1, i + 1));

  const goToNextStep = () => {
    navigate('/interlude', { state: { prompt } });
  };

  return (
    <div className="introduction-to-society">
            <SocietyHeader 
      imgSrc={companyData.imgSrc} 
      title={prompt} 
    />
      <div className="intro-content">
        <h1>{companyData?.title ?? 'Introduction'}</h1>

        <p className='video-info2'>{companyData?.videoInfo}</p>
        <div className='video-content'>
          <div id="text-container">
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
    </div>
  );
}
