import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/NavBar.css';

function NavBar({ isDark = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [visitedPages, setVisitedPages] = useState(() => {
    return JSON.parse(sessionStorage.getItem('visitedPages')) || [];
  });

  const [pressedButtons, setPressedButtons] = useState(() => {
    return JSON.parse(sessionStorage.getItem('pressedButtons')) || {
      dos: false,
      arab: false,
      old: false,
    };
  });

  const [openDropdown, setOpenDropdown] = useState({});

  useEffect(() => {
    const storedPages = JSON.parse(sessionStorage.getItem('visitedPages')) || [];
    setVisitedPages(storedPages);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  const toggleDropdown = (path) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handlePress = (key, promptText) => {
    const updated = { ...pressedButtons, [key]: true };
    setPressedButtons(updated);
    sessionStorage.setItem('pressedButtons', JSON.stringify(updated));
    navigate('/video-page', { state: { prompt: promptText } });
  };

  const handleClick = (item) => {
    if (item.locked) return;

    if (item.prompt) {
      if (item.prompt === 'החברה החרדית') handlePress('dos', item.prompt);
      if (item.prompt === 'החברה הערבית') handlePress('arab', item.prompt);
      if (item.prompt === 'מוגבלויות והגיל השלישי') handlePress('old', item.prompt);
    }

    else if (item.path) {
      navigate(item.path);
    }
    setOpenDropdown({});

    if (item.path && !visitedPages.includes(item.path)) {
      const updatedPages = [...visitedPages, item.path];
      setVisitedPages(updatedPages);
      sessionStorage.setItem('visitedPages', JSON.stringify(updatedPages));
    }
  };

  const allPromptsViewed = pressedButtons.dos && pressedButtons.arab && pressedButtons.old;

  const gameStepsViewed =
    visitedPages.includes('/part-three') &&
    visitedPages.includes('/game-intro') &&
    visitedPages.includes('/game-explain') &&
    visitedPages.includes('/summary-points');

  const parts = [
    { name: 'עמוד הבית', path: '/menu', locked: false, subtopics: [] },
    {
      name: 'חלק ראשון',
      path: '/part-one',
      locked: false,
      subtopics: [{ name: 'רבדי החברה הישראלית', path: '/part-one' }],
    },
    {
      name: 'חלק שני',
      path: '/part-two',
      locked: !visitedPages.includes('/part-one'),
      subtopics: [
        { name: 'החברה החרדית', prompt: 'החברה החרדית' },
        { name: 'החברה הערבית', prompt: 'החברה הערבית' },
        { name: 'מוגבלויות והגיל השלישי', prompt: 'מוגבלויות והגיל השלישי' },
      ],
    },
    {
      name: 'חלק שלישי',
      path: '/part-three',
      locked: !allPromptsViewed,
      subtopics: [
        { name: 'החברה הישראלית לערבית', path: '/game-intro' },
        { name: 'המשחק', path: '/game-explain' },
        { name: '10 נקודות שחשוב לזכור', path: '/summary-points' },
      ],
    },
    {
      name: 'בוחן סיום',
      path: '/final-screen',
      locked: !gameStepsViewed,
      subtopics: [],
    },
  ];

  const arrowSrc = isDark
    ? `${process.env.PUBLIC_URL}/assets/imgs/next.png`
    : `${process.env.PUBLIC_URL}/assets/imgs/next-dark.png`;

  return (
    <ul className={`nav-links ${isDark ? 'dark' : 'light'}`}>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <li
            className={`nav-item ${isActive(part.path)} ${part.locked ? 'locked' : ''}`}
            onClick={() => handleClick(part)}
          >
            {part.name}

            {part.subtopics.length > 0 && (
              <img
                src={arrowSrc}
                alt="▼"
                className={`dropdown-arrow-nav ${openDropdown[part.path] ? 'open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(part.path);
                }}
              />
            )}

            {openDropdown[part.path] && (
              <ul className="sub-nav">
                {part.subtopics.map((sub, i) => (
                  <li
                    key={i}
                    className={`sub-nav-item ${isActive(sub.path)}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(sub);
                    }}
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {index < parts.length - 1 && <span className="divider">|</span>}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default NavBar;
