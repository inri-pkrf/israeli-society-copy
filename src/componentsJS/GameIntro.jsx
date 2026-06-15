import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCSS/GameIntro.css';
import AudioPlayer from '../componentsJS/AudioPlayer';

const GameIntro = () => {
  const navigate = useNavigate();
  const audioSrc = `${process.env.PUBLIC_URL}/assets/audio/thirdPart.wav`;
  const [showButton, setShowButton] = useState(false);

  const handleAudioEnded = () => {
    setShowButton(true);
  };

  return (
    <div id="game-intro">
      <img className="white-cactus" src={`${process.env.PUBLIC_URL}/assets/imgs/white-cactus.png`} alt="cactus" />

      <div className="circle-div-game">
        <p className='PartOne-subTitle-game'>חלק שלישי</p>
        <h1 className='GameInto-title'>
          נקודות ממשק{"\n"}בין החברה החרדית לערבית
        </h1>

        <div className="audio-container-game">
          <AudioPlayer src={audioSrc} className="Audio-player" onEnded={handleAudioEnded} isDarkMode={false} />
        </div>

        <p className='PartOne-explaining-game'>
          הקשיבו לדברי ההסבר על הקווים המשיקים בין החברה החרדית לערבית
        </p>

        {showButton && (
          <button className="next-button-one-game" onClick={() => navigate('/game-explain')}>
            המשך לחלק הבא
          </button>
        )}
      </div>
    </div>
  );
};

export default GameIntro;