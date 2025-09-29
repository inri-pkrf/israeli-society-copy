import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../componentsCSS/Menu.css';

const Menu = () => {
  const navigate = useNavigate();

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

  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({});
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    sessionStorage.setItem('pressedButtons', JSON.stringify(pressedButtons));
  }, [pressedButtons]);

  useEffect(() => {
    const storedPages = JSON.parse(sessionStorage.getItem('visitedPages')) || [];
    setVisitedPages(storedPages);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setIsOpen(false);
  };

  const handleMenuClick = (item) => {
    const path = item.path || '/video-page';
    const isPromptItem = !!item.prompt;

    if (!visitedPages.includes(path)) {
      const updatedPages = [...visitedPages, path];
      setVisitedPages(updatedPages);
      sessionStorage.setItem('visitedPages', JSON.stringify(updatedPages));
    }

    if (isPromptItem) {
      if (item.prompt === 'החברה החרדית') {
        handlePress('dos', item.prompt);
      } else if (item.prompt === 'החברה הערבית') {
        handlePress('arab', item.prompt);
      } else if (item.prompt === 'מוגבלויות והגיל השלישי') {
        handlePress('old', item.prompt);
      }
    } else {
      navigate(path);
      setIsOpen(false);
    }
  };

  const allPromptsViewed = pressedButtons.dos && pressedButtons.arab && pressedButtons.old;

  const gameStepsViewed =
    visitedPages.includes('/part-three') &&
    visitedPages.includes('/game-intro') &&
    visitedPages.includes('/game-explaine') &&
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
        { name: 'המשחק', path: '/game-explaine' },
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

  return (
    <div id="menu">
      <h1 className="menu-title">שיעור דיגיטלי על החברה הישראלית</h1>
      <ul className="menu-list-home">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <li
              className={`menu-item-home ${visitedPages.includes(part.path) ? 'active' : ''} ${
                part.locked ? 'fade' : ''
              }`}
              style={{ cursor: part.locked ? 'not-allowed' : 'pointer' }}
              onClick={() => !part.locked && handleMenuClick(part)}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {part.locked && (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/imgs/lock.png`}
                    alt="Lock Icon"
                    className="lock-icon"
                  />
                )}
                {part.name}
                {part.subtopics.length > 0 && !isDesktop && (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/imgs/next.png`}
                    alt="Next"
                    className={`dropdown-arrow-home ${openDropdown[part.path] ? 'open' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(part.path);
                    }}
                  />
                )}
              </div>

              {/* start of desktop design*/}
              {(isDesktop || openDropdown[part.path]) && part.subtopics.length > 0 && (
                <ul className="submenu-list-home">
                  {part.subtopics.map((subtopic, subIndex) => (
                    <li
                      key={subIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(subtopic);
                      }}
                      className="submenu-item-home"
                    >
                      {subtopic.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>

      <div className="footer"></div>
    </div>
  );
};

export default Menu;
