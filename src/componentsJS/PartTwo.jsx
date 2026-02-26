import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../componentsCSS/PartTwo.css';

const PartTwo = () => {
  const navigate = useNavigate();


 
  return (
    <div id="part-two">
        <h3 className="part-titletwo">חלק שני
        </h3>
      <h1 className="Parttwo-title" > היכרות עם רבדי החברה השונים, מאפיינים, אתגרים והשפעה

      </h1>
      <p className='instructions-parttwo'>בחלק זה יש להשלים את הצפייה והפעילות בכל הרכיבים כדי להתקדם.

      </p>
      <div className="go-next">
      <img className="next-cir" src={`${process.env.PUBLIC_URL}/assets/imgs/nextBtn.png`} onClick={()=>{navigate("/subChosing")}} />
      

      </div>

 
<div className="footer"></div>
    </div>
  );
};

export default PartTwo;