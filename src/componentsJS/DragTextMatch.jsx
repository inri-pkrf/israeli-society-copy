import React, { useState } from "react";
import "../componentsCSS/DragTextMatch.css";

const titles = [
  "ועדת המעקב העליונה",
  "ועד ראשי הרשויות המקומיות",
  "ארגוני חברה אזרחית",
  "המנהיגות הפוליטית",
  "מנהיגות דתית איסלאמית",
];

const sentences = [
  "מהווה גוף גג אזרחי המתכלל עמדות ציבוריות ומבטא סוגיות משותפות לחברה הערבית ברמה הארצית.",
  "מייצג את ההנהגה המוניציפלית ופועל לקידום צרכים יישוביים, תשתיות ושירותים מול משרדי הממשלה.",
  "עוסקים בתחומי חינוך, רווחה, זכויות אזרח ופיתוח קהילתי, כאשר חלקם היו שותפים גם במרס״ל – מרכז סיוע לאזרח של פיקוד העורף – ונטלו חלק בפעילות אזרחית בשגרה ובחירום.",
  "מיוצגת בכנסת ישראל באמצעות שלוש מפלגות ערביות, הפועלות במסגרת הפרלמנטרית ומשקפות קולות ועמדות שונות בציבור הערבי.",
  "מחולקת לפלג הצפוני ולפלג הדרומי, שלה השפעה חברתית וקהילתית, בעיקר בתחומי זהות, חינוך ודת. ריבוי מוקדי המנהיגות משקף את המורכבות והגיוון בחברה הערבית ואת האופן שבו מתקיימת הנהגה רב־שכבתית.",
];

const correctMap = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };

export default function DragTextMatch({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState(null);
  const [locked, setLocked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({}); // { sentenceIndex: titleIndex }

  const handleAnswer = (titleIndex) => {
    if (locked) return;
    const isCorrect = correctMap[currentIndex] === titleIndex;

    if (isCorrect) {
      setStatus("correct");
      setLocked(true);
      setCorrectAnswers((prev) => ({ ...prev, [currentIndex]: titleIndex }));
      setTimeout(() => {
        if (currentIndex === sentences.length - 1) {
          onComplete && onComplete();
        } else {
          setCurrentIndex((prev) => prev + 1);
          setStatus(null);
          setLocked(false);
        }
      }, 1000);
    } else {
      setStatus("wrong");
      setLocked(true);
      setTimeout(() => {
        setStatus(null);
        setLocked(false);
      }, 1000);
    }
  };

  const progress = ((currentIndex + 1) / sentences.length) * 100;

  // מציאת אילו כותרות כבר נענו נכון בשאלות קודמות
  const answeredTitleIndices = Object.values(correctAnswers);

  return (
    <div className="dg-wrapper">
      <div className="dg-heading">בחרו את הכותרת המתאימה למשפט</div>
      <span className="dg-badge">
        שאלה {currentIndex + 1} מתוך {sentences.length}
      </span>

      <div className="dg-progress-track">
        <div className="dg-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className={`dg-sentence-box ${status || ""}`}>
        <div className={`dg-status-icon ${status ? "visible" : ""} ${status || ""}`}>
          {status === "correct" ? "✓" : status === "wrong" ? "✕" : ""}
        </div>
        {sentences[currentIndex]}
      </div>

      <div className="dg-options-grid">
        {titles.map((title, i) => {
          const isAnswered = answeredTitleIndices.includes(i);
          return (
            <button
              key={i}
              className={`dg-option ${isAnswered ? "answered" : ""}`}
              onClick={() => handleAnswer(i)}
              disabled={locked || isAnswered}
            >
              <span className="dg-option-dot" />
              {title}
            </button>
          );
        })}
      </div>

      <div className="dg-dots">
        {sentences.map((_, i) => (
          <div key={i} className={`dg-dot ${i === currentIndex ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}