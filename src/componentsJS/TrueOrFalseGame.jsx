import React, { useState } from 'react';
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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
  const [chosen, setChosen] = useState(null); // 'true' | 'false'
  const [locked, setLocked] = useState(false);

  const handleAnswer = (answer) => {
    if (locked) return;
    const isCorrect = answer === questions[currentQuestion].correct;
    setChosen(answer);
    setResult(isCorrect ? 'correct' : 'wrong');
    setLocked(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setResult(null);
      setChosen(null);
      setLocked(false);
    }
  };

  const handleNextPage = () => {
    if (prompt === 'החברה החרדית' || prompt === 'החברה הערבית') {
      navigate('/track-page', { state: { prompt } });
    } else {
      navigate('/video-page', { state: { prompt, videoIndex: 0, next: '/track-page' } });
    }
  };

  const formatFeedback = (text) => {
    if (!text) return '';
    return text
      .replace(/(תשובה נכונה, המשפט מיתוס,)/g, '<strong>$1</strong><br/>')
      .replace(/(המשפט אמת,)/g, '<strong>$1</strong><br/>')
      .replace(/(המשפט מיתוס,)/g, '<strong>$1</strong><br/>')
      .replace(/(תשובה נכונה, זו אמת,)/g, '<strong>$1</strong><br/>');
  };

  const correctSrc = `${process.env.PUBLIC_URL}/assets/imgs/cactuseCorrect.png`;
  const wrongSrc   = `${process.env.PUBLIC_URL}/assets/imgs/catuseWrong.png`;

  return (
    <div className="true-false-page">
      <SocietyHeader imgSrc={company.imgSrc} title={prompt} />

      <div id="true-false-game">

        <div id="true-false-text2">
          <p>לחצו על הקקטוס המתאים – אמת או מיתוס?</p>
        </div>

        <div className="tf-progress">{currentQuestion + 1}/{questions.length}</div>

        {/* Statement card */}
        <div
          className={`tf-statement ${result || ''}`}
          dangerouslySetInnerHTML={{
            __html: result
              ? formatFeedback(questions[currentQuestion].feedback[result])
              : questions[currentQuestion].statement
          }}
        />

        {/* Result label */}
        {result && (
          <div className={`tf-result ${result}`}>
            {result === 'correct' ? '✓ נכון!' : '✗ לא נכון'}
          </div>
        )}

        {/* Cactus buttons */}
        <div className="tf-cactus-row">

          {/* TRUE cactus */}
          <button
            className={`tf-cactus-btn ${chosen === 'true' ? (result === 'correct' ? 'picked-correct' : 'picked-wrong') : ''} ${locked && chosen !== 'true' ? 'dimmed' : ''}`}
            onClick={() => handleAnswer('true')}
            disabled={locked}
          >
            <img src={correctSrc} alt="אמת" className="tf-cactus-img" />
            <span className="tf-cactus-label true-label">אמת!</span>
          </button>

          {/* FALSE cactus */}
          <button
            className={`tf-cactus-btn ${chosen === 'false' ? (result === 'correct' ? 'picked-correct' : 'picked-wrong') : ''} ${locked && chosen !== 'false' ? 'dimmed' : ''}`}
            onClick={() => handleAnswer('false')}
            disabled={locked}
          >
            <img src={wrongSrc} alt="מיתוס" className="tf-cactus-img" />
            <span className="tf-cactus-label false-label">מיתוס</span>
          </button>

        </div>

        {/* Actions */}
        <div className="tf-actions">
          {locked && currentQuestion < questions.length - 1 && (
            <button className="tf-reset" onClick={nextQuestion}>לשאלה הבאה</button>
          )}
          {locked && currentQuestion === questions.length - 1 && (
            <div className="tf-finished">
              <p>סיימת את כל השאלות 🎉</p>
              <button className="tf-reset" onClick={handleNextPage}>המשך</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TrueOrFalseGame;