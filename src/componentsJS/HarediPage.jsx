import React from 'react';
import { useLocation } from 'react-router-dom';
import SocietyVideo from './SocietyVideo';
import videoData from '../data/videoData';

const HarediPage = () => {
  const location = useLocation();
  const state = location.state || {};
  const company = videoData['החברה החרדית'];

  const {
    videoSrc = company.videoSrc,
    videoInfo = company.videoInfo
  } = state;

  return (
    <SocietyVideo
      videoSrc={videoSrc}
      videoInfo={videoInfo}
      cactusSrc={company.imgSrc}
      title={company.title}
    />
  );
};

export default HarediPage;
