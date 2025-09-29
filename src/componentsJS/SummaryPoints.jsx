import React, { useState } from 'react';
import SummaryCards from '../componentsJS/SummaryCards';
import '../componentsCSS/SummaryPoints.css';

const SummaryPoints = () => {
  const [showCards, setShowCards] = useState(false);

  const handleNext = () => {
    setShowCards(true); 
  };
  const handleExit = () => {
    setShowCards(false);
  };
  
  if (showCards) {
    return <SummaryCards onExitToSummary={handleExit} />;
  }
  
  return (
    <div id="summary-explaine">
      <h3 className="part-titlethree">חלק שלישי</h3>
      <h1 className="summaryExp-title">10 נקודות שהכי חשוב לזכור</h1>
      <p className='instructions-summary'>
       סיכמנו עבורכם את 10 הנקודות החשובות ביותר
        <br />
לשלושת החברות יש ללחוץ על החצים על מנת להתקדם  <br />
      </p>
      
      <div className="card-arrows-sum">
  <button className="backward" disabled ></button>
  <button className="forward" onClick={handleNext}></button>
</div>

      <div className="footer-summary"></div>
    </div>
  );
};

export default SummaryPoints;
