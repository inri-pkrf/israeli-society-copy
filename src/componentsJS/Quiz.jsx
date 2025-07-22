import React, { useState, useEffect } from 'react';
import '../componentsCSS/Quiz.css';
import { useLocation } from 'react-router-dom';
import quizData from '../data/quizData';
import html2canvas from 'html2canvas';

const Quiz = ({ onReset }) => {
  const location = useLocation();
  const { firstName, lastName } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMistakes, setShowMistakes] = useState(false);

  const currentQuestion = quizData[currentIndex];
  const progressWidth = `${((currentIndex + 1) / quizData.length) * 100}%`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex, isSubmitted]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = answer;
    setSelectedAnswers(newAnswers);

    const newScore = newAnswers.reduce((acc, ans, i) => {
      return acc + (ans === quizData[i].correctAnswer ? 10 : 0);
    }, 0);

    setScore(Math.min(newScore, 100));
  };

  const nextQuestion = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const finishQuiz = () => {
    setIsSubmitted(true);
  };

  const retryQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setIsSubmitted(false);
    setShowMistakes(false);
  };

  const captureAndShareScreenshot = () => {
    const element = document.querySelector('.results');

    html2canvas(element).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      const byteString = atob(dataUrl.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uintArray], { type: 'image/png' });
      const file = new File([blob], "screenshot.png", { type: 'image/png' });

      if (navigator.share) {
        navigator.share({
          title: 'תוצאת הבוחן',
          text: 'הנה תוצאת הבוחן שלי!',
          files: [file]
        }).catch((error) => console.log('שיתוף נכשל:', error));
      } else {
        alert('הדפדפן שלך לא תומך בשיתוף');
      }
    });
  };

  return (
    <div className="quiz-container">
      {!isSubmitted ? (
        <div id="quiz">
          <p className="question-number-q">שאלה {currentIndex + 1} מתוך {quizData.length}</p>

          <div className="progress-bar-container-q">
            <div className="progress-bar-q" style={{ width: progressWidth }}></div>
          </div>

          <p className="question-q">{currentQuestion.question}</p>

          <div className="answers-q">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                className={`answer-button-q ${selectedAnswers[currentIndex] === answer ? 'selected' : ''}`}
              >
                {answer}
              </button>
            ))}
          </div>

          <div className="navigation-buttons">
            <button
              className={`${currentIndex === 0 ? 'button-disabled' : 'prev-button'}`}
              onClick={prevQuestion}
              disabled={currentIndex === 0}
            >
              שאלה קודמת
            </button>
            <button
              className={`${selectedAnswers[currentIndex] === undefined ? 'button-disabled' : 'next-button'}`}
              onClick={currentIndex === quizData.length - 1 ? finishQuiz : nextQuestion}
              disabled={selectedAnswers[currentIndex] === undefined}
            >
              {currentIndex === quizData.length - 1 ? 'סיים את המשחק' : 'שאלה הבאה'}
            </button>
          </div>
        </div>
      ) : (
        showMistakes && score<100 ? (
          <div className="mistakes-container">
            <h2>איפה טעית?</h2>
            <div className='container-mistakes'>
           {quizData
          .map((question, index) => ({ question, index })) // שמירה על האינדקס המקורי
          .filter(({ question, index }) => selectedAnswers[index] !== question.correctAnswer)
          .map(({ question, index }) => {
            const userAnswer = selectedAnswers[index];
            const correctAnswer = question.correctAnswer;

            return (
              <div key={index} className="mistake-item wrong">
                <p className="mistake-q wrong">
                  <strong>שאלה {index + 1}:</strong> {question.question}
                </p>
                <p className="ans-mis"> ענית לא נכון:{userAnswer || 'לא ענית'}</p>
                <p className="ans-mis-cor">תשובה נכונה: {correctAnswer}</p>
              </div>
            );
          })}

            </div>
             <div className='container-endBtn'>

            <button onClick={() => setShowMistakes(false)} className="back-btn-mis" >  חזרה למסך סיום </button>
          </div>
          </div>
        ) : (
          <div className="results">
            <p className='score'>ציון: {score}</p>
            <p className="user-name">שם: {firstName} {lastName}</p>
            {score >= 70 ? (
              <div>
                <p className='message'>מזל טוב!<br /> סיימת את הבוחן בהצלחה!</p>
                <button className='share-btn' onClick={captureAndShareScreenshot}>שתפו צילום מסך</button>
                <button className='try-button' onClick={retryQuiz}>נסו שוב</button>
                <button onClick={onReset} className="reset-btn">להתחלת מחדש</button>
                <button onClick={() => setShowMistakes(true)} className="mistakes-btn">איפה טעיתי?</button>
              </div>
            ) : (
              <div>
                <p className='message'>אוי, לא נורא</p>
                <button className='end-btn' onClick={retryQuiz}>נסו שוב</button>
                <button onClick={() => setShowMistakes(true)} className="mistakes-btn">איפה טעיתי?</button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
