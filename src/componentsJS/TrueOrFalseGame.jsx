import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../componentsCSS/VideoPageStep2.css';
import '../componentsCSS/TrueOrFalseGame.css';
import trueFalseData from '../data/trueFalseData';
import videoData from '../data/videoData';
import SocietyHeader from './SocietyHeader';

const TrueOrFalseGame = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sessionPrompt = sessionStorage.getItem('currentPrompt');
  const prompt = location.state?.prompt || sessionPrompt || 'החברה החרדית';
  const questions = trueFalseData[prompt] || trueFalseData['החברה החרדית'];
  const company = videoData[prompt] || videoData['החברה החרדית'];

  const cactusMap = {
    'החברה החרדית': 'cactusDos.png',
    'החברה הערבית': 'cactusArab.png',
    'מוגבלויות והגיל השלישי': 'cactusOld.png'
  };
  const cactusSrc = `${process.env.PUBLIC_URL}/assets/imgs/cuctuseJPNG/${cactusMap[prompt] || 'cactusDos.png'}`;

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

  const handleMouseUp = () => { if (!locked) evaluate(); };
  const handleTouchEnd = () => { if (!locked) evaluate(); };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setValue(50);
      setResult(null);
      setLocked(false);
    }
  };

    const handleNextPage = () => {
      if (prompt === 'מוגבלויות והגיל השלישי') {
        navigate('/track-page', { state: { prompt } });
      } else {
        navigate('/video-page', {
          state: {
            prompt,
            videoIndex: 0,
            next: '/track-page'
          }
        });
      }
    };

    return (
      <div className="true-false-page" style={{height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column'}}>
        <SocietyHeader imgSrc={company.imgSrc} title={prompt} />

        <div id="true-false-game">
          <div id="true-false-text2">
            <p>יש לבחור, לגרור ולהכריע האם המידע הוא אמת או מיתוס</p>
          </div>

          <div className="tf-progress">{currentQuestion + 1}/{questions.length}</div>

          <div className={`tf-statement ${result ? result : ''}`}>
            {result ? questions[currentQuestion].feedback[result] : questions[currentQuestion].statement}
          </div>

          {result && (
            <div className={`tf-result ${result}`}>{result === 'correct' ? 'נכון!' : 'לא נכון'}</div>
          )}

          <div className="tf-slider-wrap">
            <div className="label-left">מיתוס</div>

            <input
              ref={inputRef}
              type="range"
              min="0"
              max="100"
              value={value}
              className={`tf-range ${!locked ? '' : value < 50 ? 'left-selected' : 'right-selected'}`}
              onChange={handleChange}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleTouchEnd}
              disabled={locked}
            />

            <div className="label-right">אמת!</div>
          </div>

          <div className="tf-actions">
            {locked && currentQuestion < questions.length - 1 && (
              <button className="tf-reset" onClick={nextQuestion}>לשאלה הבאה</button>
            )}

            {locked && currentQuestion === questions.length - 1 && (
              <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                סיימת את כל השאלות 🎉
                <br />
                <button className="tf-reset" onClick={handleNextPage} style={{ marginTop: '10px' }}>המשך</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default TrueOrFalseGame;
