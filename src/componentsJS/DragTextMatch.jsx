import React, { useState, useRef, useEffect } from 'react';
import '../componentsCSS/DragGame.css';

const titles = [
  'ועדת המעקב העליונה',
  'ועד ראשי הרשויות המקומיות',
  'ארגוני חברה אזרחי',
  'המנהיגות הפוליטית',
  'מנהיגות דתית איסלאמית'
];

const sentences = [
  'מהווה גוף גג אזרחי המתכלל עמדות ציבוריות ומבטא סוגיות משותפות לחברה הערבית ברמה הארצית.',
  'מייצג את ההנהגה המוניציפלית ופועל לקידום צרכים יישוביים, תשתיות ושירותים מול משרדי הממשלה.',
  'פועלים בתחומי חינוך, רווחה, זכויות אזרח ופיתוח קהילתי.',
  'מיוצגת בכנסת ישראל באמצעות שלוש מפלגות ערביות.',
  'מחולקת לפלג הצפוני ולפלג הדרומי.'
];

const correctMap = { 0:0,1:1,2:2,3:3,4:4 };

export default function DragTextMatch({ onComplete }) {
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [matches, setMatches] = useState({});
  const [feedback, setFeedback] = useState({});
  const offsetRef = useRef({ x: 0, y: 0 });
  const dropRefs = useRef({});

  // 👇 מאזינים ל-window
  useEffect(() => {
    const move = (e) => {
      if (draggedIdx === null) return;
      setDragPos({ x: e.clientX, y: e.clientY });
    };

    const up = () => {
      if (draggedIdx === null) return;

      const droppedOn = Object.entries(dropRefs.current).find(([idx, el]) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
          dragPos.x >= rect.left &&
          dragPos.x <= rect.right &&
          dragPos.y >= rect.top &&
          dragPos.y <= rect.bottom
        );
      });

      if (droppedOn) {
        const dropIdx = Number(droppedOn[0]);
        const isCorrect = correctMap[draggedIdx] === dropIdx;

        setFeedback(prev => ({
          ...prev,
          [dropIdx]: isCorrect ? 'correct' : 'wrong'
        }));

        if (isCorrect) {
          setMatches(prev => {
            const updated = { ...prev, [dropIdx]: draggedIdx };
            if (Object.keys(updated).length === titles.length && onComplete) {
              onComplete();
            }
            return updated;
          });
        }

        setTimeout(() => {
          setFeedback(prev => ({ ...prev, [dropIdx]: null }));
        }, 800);
      }

      setDraggedIdx(null);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [draggedIdx, dragPos, onComplete]);

  const startDrag = (idx, e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    setDraggedIdx(idx);
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="drag-game" style={{ direction: 'rtl', touchAction: 'none' }}>
      <h3>גררו את הכותרת למשפט המתאים</h3>

      <div className="parties">
        {titles.map((title, i) =>
          !Object.values(matches).includes(i) && (
            <div
              key={i}
              className="party-img"
              style={{
                background: '#fff',
                border: '1px solid #1bbfe5',
                borderRadius: 12,
                padding: '0.6em 1em',
                cursor: 'grab',
                userSelect: 'none'
              }}
              onPointerDown={(e) => startDrag(i, e)}
            >
              {title}
            </div>
          )
        )}
      </div>

      <div className="sectors">
        {sentences.map((sentence, i) => (
          <div
            key={i}
            ref={(el) => (dropRefs.current[i] = el)}
            className={`sector-box ${
              feedback[i] === 'correct'
                ? 'correct'
                : feedback[i] === 'wrong'
                ? 'wrong'
                : ''
            }`}
            style={{ minHeight: 80, padding: '1em', textAlign: 'right' }}
          >
            {sentence}

            {matches[i] !== undefined && (
              <div style={{ fontWeight: 700, marginTop: 8 }}>
                {titles[matches[i]]}
              </div>
            )}
          </div>
        ))}
      </div>

      {draggedIdx !== null && (
        <div
          style={{
            position: 'fixed',
            left: dragPos.x - offsetRef.current.x,
            top: dragPos.y - offsetRef.current.y,
            background: '#fff',
            border: '1px solid #1bbfe5',
            borderRadius: 12,
            padding: '0.6em 1em',
            pointerEvents: 'none',
            zIndex: 9999
          }}
        >
          {titles[draggedIdx]}
        </div>
      )}
    </div>
  );
}
