import React, { useRef, useState, useEffect } from 'react';
import '../componentsCSS/AudioPlayer.css';

const AudioPlayer = ({ src, name, onEnded, isDarkMode = false }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded(); // מעביר להורה כשהסתיים
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = progressBarRef.current;
    const audio = audioRef.current;
    if (!progressBar || !audio) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = Math.max(0, Math.min(1, (width - clickX) / width)); // מימין לשמאל
    const newTime = percent * audio.duration;

    audio.currentTime = newTime;
    setProgress(percent * 100);
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const playButtonImage = isDarkMode
    ? `${process.env.PUBLIC_URL}/assets/imgs/stop-light.png`
    : `${process.env.PUBLIC_URL}/assets/imgs/stop-light.png`;

  const micIconImage = isDarkMode
    ? `${process.env.PUBLIC_URL}/assets/imgs/play-button.png`
    : `${process.env.PUBLIC_URL}/assets/imgs/play-button.png`;

  return (
    <div className={`voiceeffect-rectangle `}>
      <span className="voiceeffect-text">{name}</span>

      <button className="audio-button" onClick={togglePlay}>
        <img
          src={isPlaying ? playButtonImage : micIconImage}
          alt={isPlaying ? 'עצור' : 'האזן'}
          className="mic-icon"
        />
      </button>

      <div
        className="progress-bar"
        ref={progressBarRef}
        onClick={handleProgressClick}
      >
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      <div className="time-display">
  <span className={`time-current ${isDarkMode ? 'dark' : 'light'}`}>
    {formatTime(currentTime)}
  </span>
  {' / '}
  <span className={`time-duration ${isDarkMode ? 'light' : 'dark'}`}>
    {formatTime(duration)}
  </span>
</div>
<img className="small-microphone" src={`${process.env.PUBLIC_URL}/assets/imgs/small-microphone.png`} />


      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
