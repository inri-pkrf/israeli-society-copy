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

  // 🔒 לוגיקת נעילה מדורגת
  const isLocked = (key) => {
    if (key === 'dos') return false; // תמיד פתוח ראשון
    if (key === 'arab') return !pressedButtons.dos; // נפתח רק אחרי חרדית
    if (key === 'old') return !pressedButtons.arab; // נפתח רק אחרי ערבית
    return true;
  };

  const handlePress = (key, promptText) => {
    if (isLocked(key)) return; // אם נעול – לא עושה כלום

    const updated = { ...pressedButtons, [key]: true };
    setPressedButtons(updated);
    sessionStorage.setItem('pressedButtons', JSON.stringify(updated));

    navigate('/introduction-to-society', { 
      state: { 
        prompt: promptText,
        from: "part-two-sub"
      } 
    });
  };

  const allPressed = Object.values(pressedButtons).every(Boolean);

  const goToNextStep = () => {
    navigate('/part-three');
  };

  return (
    <div id="part-two-sub">
      <h3 className="part-titletwo-sub">חלק שני</h3>
      <p className='instructions-parttwo-sub'>
        כאן לומדים על רבדי החברה הישראלית, יש לסיים את שלושת הנושאים כדי להתקדם
      </p>

      <div className="half-circle-buttons column">

        {/* החברה החרדית – תמיד פתוח */}
        <div className="button-with-text">
          <button
            className={`
              half-circle-button 
              ${pressedButtons.dos ? 'pressed' : ''} 
              ${isLocked('dos') ? 'locked-btn' : ''}
            `}
            onClick={() => handlePress('dos', 'החברה החרדית')}
            disabled={isLocked('dos')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusDos.png`}
              alt="החברה החרדית"
              className="button-img"
            />
          </button>
          <span className={`button-label ${pressedButtons.dos ? 'label-pressed' : ''}`}>
            החברה החרדית
          </span>
        </div>

        {/* החברה הערבית – נפתח אחרי חרדית */}
        <div className="button-with-text">
          <button
            className={`
              half-circle-button 
              ${pressedButtons.arab ? 'pressed' : ''} 
              ${isLocked('arab') ? 'locked-btn' : ''}
            `}
            onClick={() => handlePress('arab', 'החברה הערבית')}
            disabled={isLocked('arab')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusArab.png`}
              alt="החברה הערבית"
              className="button-img"
            />
          </button>
          <span className={`button-label ${pressedButtons.arab ? 'label-pressed' : ''}`}>
            החברה הערבית
          </span>
        </div>

        {/* הגיל השלישי – נפתח אחרי ערבית */}
        <div className="button-with-text">
          <button
            className={`
              half-circle-button 
              ${pressedButtons.old ? 'pressed' : ''} 
              ${isLocked('old') ? 'locked-btn' : ''}
            `}
            onClick={() => handlePress('old', 'מוגבלויות והגיל השלישי')}
            disabled={isLocked('old')}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusOld.png`}
              alt="מוגבלויות והגיל השלישי"
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