import React, { useState } from 'react';
import summaryData from '../data/summaryData';
import '../componentsCSS/SummaryCards.css';
import { useNavigate } from 'react-router-dom';


const SummaryCards = ({ onExitToSummary }) => {
    const navigate = useNavigate();


  const cardKeys = Object.keys(summaryData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < cardKeys.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/final-screen'); 
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      if (onExitToSummary) {
        onExitToSummary(); 
      }
    }
  };
  const GoBack = () => {
    if (onExitToSummary) {
      onExitToSummary(); 
    }
  };
  
  const currentCard = summaryData[cardKeys[currentIndex]];

  return (
    <div className="summary-card" style={{ backgroundColor: currentCard.color }}>
      <p className='closeCard' onClick={ GoBack}>X</p>
        <h1 className="point-num">{currentIndex + 1}</h1>
      <h2 className="card-title"> {currentCard.title}</h2>

      <div className="card-sections-wrapper">

      <div className="card-section">
        <p>{currentCard.Arab}</p>
        <img src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusArab.png`} alt="קקטוס ערבי" />
      </div>
      <div className="card-section">
        <p>{currentCard.Dos}</p>
        <img src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusDos.png`} alt="קקטוס חרדי" />
      </div>
      <div className="card-section">
        <p>{currentCard.Old}</p>
        <img src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusOld.png`} alt="קקטוס כללי" />
      </div>
      </div>


      <div className="card-arrows">
  <button className="backward" onClick={handlePrev} ></button>
  <button className="forward" onClick={handleNext} ></button>
</div>

    </div>
  );
};

export default SummaryCards;
