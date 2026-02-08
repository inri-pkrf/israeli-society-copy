import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Intro from './componentsJS/Intro';
import Home from './componentsJS/Home';
import Header from './componentsJS/Header';
import Menu from './componentsJS/Menu';
import PartOne from './componentsJS/PartOne';
import PartTwo from './componentsJS/PartTwo';
import PartThree from './componentsJS/PartThree';
import PartTwoSub from './componentsJS/PartTwoSub';
import VideoPage from './componentsJS/VideoPage';
import GameIntro from './componentsJS/GameIntro';
import GameExplaine from './componentsJS/GameExplaine';
import Game from './componentsJS/Game'
import SummaryPoints from './componentsJS/SummaryPoints'
import FinalScreen from './componentsJS/FinalScreen'
import Quiz from './componentsJS/Quiz'

// mobile only until the design is complete

function useIsPortraitAndSmallScreen() {
  const [isAllowed, setIsAllowed] = React.useState(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width > 768) return false;  
    return height > width;           
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width > 768) {
        setIsAllowed(false);
      } else {
        setIsAllowed(height > width);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isAllowed;
}


function App() {
  const location = useLocation();
  const allowedHorizontalPaths = ['/video-page'];
  const isAllowed = useIsPortraitAndSmallScreen();
  const isHorizontalAllowed = allowedHorizontalPaths.includes(location.pathname);
   if (!isHorizontalAllowed && !isAllowed) {
    return (
      <div className="orientation-warning" >
      
      </div>
    );
  }

  return (
    <div className="App">
      <Header className="header-fixed" />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/part-one" element={<PartOne />} />
        <Route path="/part-two" element={<PartTwo />} />
        <Route path="/subChosing" element={<PartTwoSub />} />
        <Route path="/video-page" element={<VideoPage />} />
        <Route path="/part-three" element={<PartThree />} />
        <Route path="/game-intro" element={<GameIntro />} />
        <Route path="/game-explain" element={<GameExplaine />} />
        <Route path="/game" element={<Game/>} />
        <Route path="/summary-points" element={<SummaryPoints/>} />
        <Route path="/final-screen" element={<FinalScreen/>} />
        <Route path="/test" element={<Quiz/>} />


        </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
