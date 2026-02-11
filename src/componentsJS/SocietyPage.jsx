import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../componentsCSS/VideoPageStep2.css';

const SocietyPage = ({ society }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const { videoSrc, videoInfo, titleContent, textContent, slides } = state;

  const title = videoInfo || titleContent || society || '';

  return (
    <div className="video-step2">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <button className="next-step-button-2" onClick={() => navigate(-1)}>חזרה</button>
        <h1 style={{margin: '0', padding: '10px'}}>{title}</h1>
        <div style={{width: 80}} />
      </div>

      {videoSrc ? (
        <video className="video-play" controls style={{width: '100%'}}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p style={{padding: '16px'}}>לא נמצא וידאו להצגה</p>
      )}

      {textContent && (
        <div className="video-content" style={{padding: '12px'}}>
          <h2>{titleContent}</h2>
          <p>{textContent}</p>
        </div>
      )}

      {slides && slides.length > 0 && (
        <div className="video-content" style={{padding: '12px'}}>
          {slides.map((s, idx) => (
            <div key={idx} style={{marginBottom: 12}}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocietyPage;
