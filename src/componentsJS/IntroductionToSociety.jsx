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

  const initialSlides = companyData?.slides ?? [
    { title: companyData?.title ?? '', text: companyData?.videoInfo ?? '' },
  ];

  const [slides] = useState(initialSlides);
  const [slideIndex, setSlideIndex] = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (!prompt || !companyData) {
      navigate('/subChosing');
    }
  }, [prompt, companyData, navigate]);

  const activeSlide = slides[slideIndex] || { title: '', text: '' };

  const prevSlide = () => {
    setSlideIndex((i) => Math.max(0, i - 1));
    setHasNavigated(true);
  };

  const nextSlide = () => {
    setSlideIndex((i) => Math.min(slides.length - 1, i + 1));
    setHasNavigated(true);
  };

  const goToNextStep = () => {
    if (prompt === "מוגבלויות והגיל השלישי") {
      navigate('/interlude', {
        state: {
          prompt,
          from: "introduction-to-society"
        }
      });
    } else {
      navigate('/video-page', {
        state: {
          prompt,
          videoIndex: 0,
          from: "introduction-to-society"
        }
      });
    }
  };

  const shouldShowButton =
    prompt !== "החברה החרדית" || hasNavigated;

  if (!companyData) return null;

  return (
    <div className="introduction-to-society">

      <SocietyHeader
        className="society-header"
        imgSrc={companyData.imgSrc}
        title={prompt}
      />

      <div className="intro-content">

        <p className='video-info2'>
          {companyData.videoInfo}
        </p>

        <div className='video-content'>
        <div id="text-container">
          <h2>{activeSlide.title}</h2>
          <p>
            {activeSlide.text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
          <button
            className="introduction-to-society next-step-button-2"
            onClick={goToNextStep}
          >
            לשלב הבא
          </button>
        </div>

      </div>
    </div>
  );
}