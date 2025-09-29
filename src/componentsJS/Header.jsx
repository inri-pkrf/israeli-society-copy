import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCSS/Header.css';
import Hamburger from './Hamburger';
import NavBar from './NavBar';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const isSpecialPath = ['/home', '/game', '/test'].includes(location.pathname);

  const imageSrc = isSpecialPath
    ? `${process.env.PUBLIC_URL}/assets/imgs/collegeLogo.png` 
    : `${process.env.PUBLIC_URL}/assets/imgs/whiteLogo.svg`; 


  const isDarkMode = !['/home', '/game', '/test'].includes(location.pathname);


  return (
    <header className={isSpecialPath ? 'header' : 'header2'}>
      {/*desktop or mobile*/}
      {isMobile ? <Hamburger className="hamburger" /> : <NavBar isDark={isDarkMode} />}

      <img src={imageSrc} className="App-logo" alt="logo" />

      <button className="back-homeNav" onClick={() => navigate('/home')} />

      {isSpecialPath && (
        <img
          src={`${process.env.PUBLIC_URL}/assets/imgs/blueTriangle.png`}
          alt="Decorative"
          className="decorative-photo"
        />
      )}
    </header>
  );
}

export default Header;
