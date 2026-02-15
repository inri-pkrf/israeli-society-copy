import React from 'react';
import '../componentsCSS/SocietyHeader.css';

const SocietyHeader = ({ imgSrc, title }) => {
  return (
    <>
    <div id="SocietyHeader">
        <img className="cactus-img" src={imgSrc} alt={`${title} logo`} />
        <div className="circle-div-video">
            <h1 className="page-title-video">{title}</h1>
        </div>
    </div>
    </>
  );
};

export default SocietyHeader;
