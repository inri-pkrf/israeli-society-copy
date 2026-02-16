import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import secondPart from '../data/videoData';
import Questions from './Questions';
import SocietyHeader from './SocietyHeader';
import '../componentsCSS/IntroductionToSociety.css';

export default function SocietyQuestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const prompt = location.state?.prompt || sessionStorage.getItem('currentPrompt');
  const companyData = secondPart[prompt];

  useEffect(() => {
    if (!prompt || !companyData) {
      navigate('/subChosing');
    }
  }, [prompt, companyData, navigate]);

  const goToPartThree = () => {
    navigate('/subChosing');
  };

  if (!companyData) return null;

  return (
    <div className="introduction-to-society" ref={containerRef}>
      <SocietyHeader imgSrc={companyData.imgSrc} title={prompt} />
      <div className="intro-content">
        <Questions
          questions={companyData.questions}
          startPartThree={goToPartThree}
          scrollContainerRef={containerRef}
          renderQExplain={() => (
            <p className='Q-explain'>בנוקודה זו נשאל כמה שאלות כדי לוודא הבנה...</p>
          )}
        />
      </div>
    </div>
  );
}
