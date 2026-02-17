import React, { useState, useEffect } from "react";
import "../componentsCSS/DragGame.css";

const titles = [
  "ועדת המעקב העליונה",
  "ועד ראשי הרשויות המקומיות",
  "ארגוני חברה אזרחי",
  "המנהיגות הפוליטית",
  "מנהיגות דתית איסלאמית"
];

const sentences = [
  "מהווה גוף גג אזרחי המתכלל עמדות ציבוריות ומבטא סוגיות משותפות לחברה הערבית ברמה הארצית.",
  "מייצג את ההנהגה המוניציפלית ופועל לקידום צרכים יישוביים, תשתיות ושירותים מול משרדי הממשלה.",
  "עוסקים בתחומי חינוך, רווחה, זכויות אזרח ופיתוח קהילתי, כאשר חלקם היו שותפים גם במרס״ל – מרכז סיוע לאזרח של פיקוד העורף – ונטלו חלק בפעילות אזרחית בשגרה ובחירום. ",
  "מיוצגת בכנסת ישראל באמצעות שלוש מפלגות ערביות, הפועלות במסגרת הפרלמנטרית ומשקפות קולות ועמדות שונות בציבור הערבי. ",
  "מחולקת לפלג הצפוני ולפלג הדרומי, שלה השפעה חברתית וקהילתית, בעיקר בתחומי זהות, חינוך ודת. ריבוי מוקדי המנהיגות משקף את המורכבות והגיוון בחברה הערבית ואת האופן שבו מתקיימת הנהגה רב־שכבתית"
];

const correctMap = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };

export default function DragTextMatch({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState(null); // null | 'correct' | 'wrong'
  const [locked, setLocked] = useState(false);

  const handleAnswer = (titleIndex) => {
    if (locked) return;

    const isCorrect = correctMap[currentIndex] === titleIndex;

    if (isCorrect) {
      setStatus("correct");
      setLocked(true);

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
          setStatus(null);   // מחזיר צבע רגיל
          setLocked(false);  // מאפשר לענות שוב
        }, 1000);
      }

  };

  return (
    <div
      className="quiz-game"
      style={{
        position: "relative",
        direction: "rtl",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        boxSizing: "border-box",
        textAlign: "center",
        top: "-16vh",
      }}
    >
      <h4>
        בחרו את הכותרת המתאימה למשפט
      </h4>

      <div
        style={{
          maxWidth: 600,
          width: "100%",
          padding: "1.5rem",
          borderRadius: 16,
          background:
            status === "correct"
              ? "#d4edda"
              : status === "wrong"
              ? "#f8d7da"
              : "#f4f6fb",
          border:
            status === "correct"
              ? "2px solid #28a745"
              : status === "wrong"
              ? "2px solid #dc3545"
              : "2px solid #1bbfe5",
          transition: "all 0.3s ease"
        }}
      >
        {sentences[currentIndex]}
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
          width: "100%",
          maxWidth: 600,
        }}
      >
        {titles.map((title, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={locked}
            style={{
              padding: "0.7rem",
              borderRadius: 12,
              border: "2px solid #1bbfe5",
              background: "#fff",
              cursor: locked ? "default" : "pointer",
              fontSize: "1rem",
              fontWeight: 500,
              transition: "all 0.2s ease",
              color: "#003561"
            }}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
}
