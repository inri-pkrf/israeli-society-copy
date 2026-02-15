import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../componentsCSS/PartTwoSub.css';

const PartTwoSub = () => {
  const navigate = useNavigate();
  const [pressedButtons, setPressedButtons] = useState({
    dos: false,
    arab: false,
    old: false
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('pressedButtons');
    if (saved) {
      setPressedButtons(JSON.parse(saved));
    }
  }, []);

  const handlePress = (key, promptText) => {
    const updated = { ...pressedButtons, [key]: true };
    setPressedButtons(updated);
    sessionStorage.setItem('pressedButtons', JSON.stringify(updated));
    navigate('/introduction-to-society', { state: { prompt: promptText } }); // מעבר לעמוד ההקדמה עם פרומפט
  };

  const allPressed = Object.values(pressedButtons).every(Boolean);

  const goToNextStep = () => {
    navigate('/part-three');
  };

  return (
    <div id="part-two-sub">
      <h3 className="part-titletwo-sub">חלק שני</h3>
      <p className='instructions-parttwo-sub'>כאן לומדים על הנושאים הבאים, יש לסיים את שלושתם כדי להתקדם</p>

      <div className="half-circle-buttons column">

        <div className="button-with-text">
          <button
            className={`half-circle-button ${pressedButtons.dos ? 'pressed' : ''}`}
            onClick={() => handlePress('dos', 'החברה החרדית')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusDos.png`}
              alt="כפתור 1"
              className="button-img"
            />
          </button>
          <span className={`button-label ${pressedButtons.dos ? 'label-pressed' : ''}`}>
            החברה החרדית
          </span>
        </div>

        <div className="button-with-text">
          <button
            className={`half-circle-button ${pressedButtons.arab ? 'pressed' : ''}`}
            onClick={() => handlePress('arab', 'החברה הערבית')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusArab.png`}
              alt="כפתור 2"
              className="button-img"
            />
          </button>
          <span className={`button-label ${pressedButtons.arab ? 'label-pressed' : ''}`}>
            החברה הערבית
          </span>
        </div>

        <div className="button-with-text">
          <button
            className={`half-circle-button ${pressedButtons.old ? 'pressed' : ''}`}
            onClick={() => handlePress('old', 'מוגבלויות והגיל השלישי')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusOld.png`}
              alt="כפתור 3"
              className="button-img"
            />
          </button>
          <span className={`button-label ${pressedButtons.old ? 'label-pressed' : ''}`}>
          מוגבלויות והגיל השלישי
          </span>
        </div>
      </div>

      <button
        className="next-step-button-21"
        onClick={goToNextStep}
        disabled={!allPressed}
      >
        לשלב הבא
      </button>

      <div className="footer"></div>
    </div>
  );
};

export default PartTwoSub;