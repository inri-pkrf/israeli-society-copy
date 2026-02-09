import React, { useState, useRef } from 'react';
import '../componentsCSS/VideoPageStep2.css';
import '../componentsCSS/TrueOrFalseGame.css';

const TrueOrFalseGame = () => {

const questions = [
  { 
    statement: 'רוב החרדים גרים בירושלים ובבני ברק', 
    correct: 'true',
    feedback: {
      correct: 'נכון! רוב החרדים מרוכזים בירושלים ובבני ברק.',
      wrong: 'לא נכון. רוב החרדים אכן גרים בירושלים ובבני ברק.'
    }
  },
  { 
    statement: 'כל החרדים מתנגדים ללימודי ליבה', 
    correct: 'false',
    feedback: {
      correct: 'נכון! לא כל החרדים מתנגדים ללימודי ליבה – יש קהילות שמקדמות לימודים כלליים.',
      wrong: 'לא נכון. יש חרדים שלומדים גם לימודי ליבה.'
    }
  },
  { 
    statement: 'החברה החרדית מגוונת ומורכבת מתתי-קהילות שונות', 
    correct: 'true',
    feedback: {
      correct: 'נכון! יש מגוון של תתי-קהילות בחברה החרדית.',
      wrong: 'לא נכון. החברה החרדית אכן מורכבת מקבוצות ותתי-קהילות שונות.'
    }
  },
  { 
    statement: 'כל הגברים החרדים אינם עובדים כלל', 
    correct: 'false',
    feedback: {
      correct: 'נכון! לא כל הגברים החרדים אינם עובדים – רבים עובדים במגוון תחומים.',
      wrong: 'לא נכון. ישנם גברים חרדים רבים שעובדים.'
    }
  },
  { 
    statement: 'החברה החרדית מונה מעל מיליון איש בישראל', 
    correct: 'true',
    feedback: {
      correct: 'נכון! האוכלוסייה החרדית בישראל מונה מעל מיליון איש.',
      wrong: 'לא נכון. מספר החרדים בישראל אכן מעל מיליון.'
    }
  },
  { 
    statement: 'כל החרדים לובשים אותו לבוש בדיוק', 
    correct: 'false',
    feedback: {
      correct: 'נכון! יש הבדלים בלבוש בין הקבוצות השונות בחברה החרדית.',
      wrong: 'לא נכון. לא כל החרדים לובשים את אותו הלבוש.'
    }
  },
  { 
    statement: 'יש זרמים שונים בתוך החברה החרדית', 
    correct: 'true',
    feedback: {
      correct: 'נכון! קיימים מספר זרמים בחברה החרדית כמו חסידים, ליטאים, ספרדים ועוד.',
      wrong: 'לא נכון. קיימים זרמים שונים בתוך החברה החרדית.'
    }
  },
  { 
    statement: 'כל הנשים החרדיות אינן עובדות', 
    correct: 'false',
    feedback: {
      correct: 'נכון! נשים רבות בחברה החרדית משתלבות בשוק העבודה.',
      wrong: 'לא נכון. יש נשים חרדיות רבות שעובדות.'
    }
  },
  { 
    statement: 'הילודה בחברה החרדית גבוהה מהממוצע בישראל', 
    correct: 'true',
    feedback: {
      correct: 'נכון! שיעור הילודה בחברה החרדית גבוה מהממוצע הארצי.',
      wrong: 'לא נכון. הילודה בחברה החרדית אכן גבוהה מהממוצע.'
    }
  },
  { 
    statement: 'החברה החרדית אינה משתתפת כלל בפוליטיקה', 
    correct: 'false',
    feedback: {
      correct: 'נכון! החרדים משתתפים בפוליטיקה בישראל דרך מפלגות ייצוגיות.',
      wrong: 'לא נכון. החברה החרדית פעילה גם בפוליטיקה.'
    }
  }
];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [value, setValue] = useState(50);
  const [result, setResult] = useState(null);
  const [locked, setLocked] = useState(false);

  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (locked) return;
    setValue(Number(e.target.value));
  };

  const evaluate = () => {
    const answer = value >= 50 ? 'true' : 'false';
    setResult(answer === questions[currentQuestion].correct ? 'correct' : 'wrong');
    setLocked(true);
  };

  const handleMouseUp = () => {
    if (!locked) evaluate();
  };

  const handleTouchEnd = () => {
    if (!locked) evaluate();
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setValue(50);
      setResult(null);
      setLocked(false);
    }
  };

  return (
    <div id="videoPage" className="video-step2">

      <img
        className="cactus-img"
        src={`${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/cactusDos.png`}
        alt="cactus"
      />

      <div className="circle-div-video">
        <h1 className="page-title-video">החברה החרדית</h1>
      </div>

      <div id="true-false-text2">
        <p id="text-bold">אמת או מיתוס?</p>
        <p>יש לבחור, לגרור ולהכריע האם המידע הוא אמת או מיתוס</p>
      </div>

      <div id="true-false-game">

        <div className="tf-progress">
          {currentQuestion + 1}/{questions.length}
        </div>

        <div className={`tf-statement ${result ? result : ''}`}>
          {result ? questions[currentQuestion].feedback[result] : questions[currentQuestion].statement}
        </div>

        {result && (
          <div className={`tf-result ${result}`}>
            {result === 'correct' ? 'נכון!' : 'לא נכון'}
          </div>
        )}




        <div className="tf-slider-wrap">

          <div className="label-left">מיתוס</div>

          <input
            ref={inputRef}
            type="range"
            min="0"
            max="100"
            value={value}
            className={`tf-range ${
              !locked ? '' : value < 50 ? 'left-selected' : 'right-selected'
            }`}
            onChange={handleChange}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleTouchEnd}
            disabled={locked}
          />


          <div className="label-right">אמת!</div>

        </div>

        <div className="tf-actions">
          {locked && currentQuestion < questions.length - 1 && (
            <button className="tf-reset" onClick={nextQuestion}>
              לשאלה הבאה
            </button>
          )}
          {locked && currentQuestion === questions.length - 1 && (
            <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
              סיימת את כל השאלות 🎉
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default TrueOrFalseGame;
