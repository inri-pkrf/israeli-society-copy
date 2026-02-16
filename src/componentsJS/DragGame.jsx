import React, { useState, useRef } from 'react';
import '../componentsCSS/DragGame.css';

const publicUrl = process.env.PUBLIC_URL || '';

const parties = [
  { id: 'shas', name: 'ש"ס', img: `${publicUrl}/assets/imgs/shas.png`, sector: 'המגזר הספרדי' },
  { id: 'utj', name: 'דגל התורה', img: `${publicUrl}/assets/imgs/degelTora.png`, sector: 'המגזר הליטאי ' },
  { id: 'aguda', name: 'אגודת ישראל', img: `${publicUrl}/assets/imgs/aguda.png`, sector: 'המגזר החסידי' },
];

const sectors = [
  { id: 'sefaradi', name: 'המגזר הספרדי' },
  { id: 'litai', name: 'המגזר הליטאי ' },
  { id: 'hasidi', name: 'המגזר החסידי' },
];

const DragGame = ({ onComplete }) => {
  const [draggedParty, setDraggedParty] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [matches, setMatches] = useState({});
  const [feedback, setFeedback] = useState({});
  const sectorRefs = useRef({});
  const gameRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const pointerCaptureRef = useRef(null);

  const startDrag = (party, e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Prefer the pointer's offset within the element if available (works for mouse),
    // otherwise fall back to centering the icon under the finger for touch.
    const native = e.nativeEvent || {};
    const offsetX = typeof native.offsetX === 'number' ? native.offsetX : rect.width / 2;
    const offsetY = typeof native.offsetY === 'number' ? native.offsetY : rect.height / 2;

    offsetRef.current = { x: offsetX, y: offsetY };

    // Capture the pointer on the element so we continue to receive pointer events
    // even if the pointer moves quickly outside the element.

    if (typeof e.pointerId === 'number' && e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
        pointerCaptureRef.current = { el: e.currentTarget, id: e.pointerId };
      } catch (err) {
        pointerCaptureRef.current = null;
      }
    }

    setDraggedParty(party);
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const moveDrag = (e) => {
    if (!draggedParty) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const endDrag = (e) => {
    if (!draggedParty) return;

    // Release any pointer capture that was set on the source element so other
    // UI elements (like modal close buttons) receive pointer events again.
    const cap = pointerCaptureRef.current;
    if (cap && cap.el && typeof cap.el.releasePointerCapture === 'function') {
      try { cap.el.releasePointerCapture(cap.id); } catch (err) {}
    }
    pointerCaptureRef.current = null;

    const droppedOn = Object.entries(sectorRefs.current).find(([name, el]) => {
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
      const [sectorName] = droppedOn;
      const isCorrect = draggedParty.sector === sectorName;

      setFeedback((prev) => ({
        ...prev,
        [sectorName]: isCorrect ? 'correct' : 'wrong',
      }));

      if (isCorrect) {
        setMatches((prev) => {
          const updated = { ...prev, [sectorName]: draggedParty };

          const allCorrect = sectors.every(
            (sector) => updated[sector.name]?.sector === sector.name
          );

          if (allCorrect && onComplete) onComplete();

          return updated;
        });
      }

      setTimeout(() => {
        setFeedback((prev) => ({ ...prev, [sectorName]: null }));
      }, 800);
    }

    setDraggedParty(null);
  };

  return (
    <div
      className="drag-game"
      ref={gameRef}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
    >
      <h3>גררו את המפלגה אל המגזר המתאים</h3>

      <div className="parties">
        {parties.map((party) => (
          <img
            key={party.id}
            src={party.img}
            alt={party.name}
            className="party-img"
            onPointerDown={(e) => startDrag(party, e)}
          />
        ))}
      </div>

      <div className="sectors">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            ref={(el) => (sectorRefs.current[sector.name] = el)}
            className={`sector-box ${
              feedback[sector.name] === 'correct'
                ? 'correct'
                : feedback[sector.name] === 'wrong'
                ? 'wrong'
                : ''
            }`}
          >
            <div className="sector-title">{sector.name}</div>
            {matches[sector.name] && (
              <img
                src={matches[sector.name].img}
                alt={matches[sector.name].name}
                className="party-img small"
              />
            )}
          </div>
        ))}
      </div>

      {draggedParty && (
        <img
          src={draggedParty.img}
          alt="dragging"
          className="dragging-img"
          style={{
            left: `${(gameRef.current ? dragPos.x - gameRef.current.getBoundingClientRect().left : dragPos.x) - offsetRef.current.x}px`,
            top: `${(gameRef.current ? dragPos.y - gameRef.current.getBoundingClientRect().top : dragPos.y) - offsetRef.current.y}px`,
          }}
        />
      )}
    </div>
  );
};

export default DragGame;
