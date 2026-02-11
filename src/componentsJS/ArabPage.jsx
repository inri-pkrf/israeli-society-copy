import React from 'react';
import { useLocation } from 'react-router-dom';
import SocietyVideo from './SocietyVideo';
import videoData from '../data/videoData';

const ArabPage = () => {
  const location = useLocation();
  const state = location.state || {};
  const company = videoData['החברה הערבית'];
  const { videoSrc = company.videoSrc, videoInfo = company.videoInfo } = state;

  return (
    <SocietyVideo videoSrc={videoSrc} videoInfo={videoInfo} cactusSrc={company.imgSrc} title={company.title} />
  );
};

export default ArabPage;
