import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCSS/VideoPageStep2.css';
import '../componentsCSS/TrueOrFalse.css';

const TrueOrFalse = ({ title, text, onContinue }) => {
  const navigate = useNavigate();
  return (
    <div className="video-step2">
      <div className='video-content'>
        <div id ="true-false-text">
          <h3>אמת או מיתוס</h3>
          <p>בחלק זה, יש לבחור, לגרור ולהכריע האם המידע הוא אמת או מיתוס</p>
        </div>


      </div>

    <img
    src={`${process.env.PUBLIC_URL}/assets/imgs/next-blue.png`}
    className='next-blue'
    onClick={() => navigate('/TrueOrFalseGame')}
    />

      {/* <button className="next-step-button-2" onClick={onContinue}>להמשיך לשאלות</button> */}
    </div>
  );
};

export default TrueOrFalse;
