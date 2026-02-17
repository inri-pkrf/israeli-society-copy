import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../componentsCSS/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate('/menu'); 
  };

  return (
    <div className="homepage-container">
      <h3 className='home-title'>  ברוכים וברוכות הבאים והבאות   <br></br>לשיעור דיגיטלי על החברה הישראלית

 </h3>
 <p className="info1">
בסיום לומדה זו תכירו את רבדי החברה הישראלית,
מה משפיע על החלטות ופעולות של אזרחים מהחברה הערבית והחרדית,<br/>
בני ובנות הגיל השלישי ואנשים עם מוגבלויות.<br/>
בעזרת מוצר זה תוכלו להכיר את אורחות החיים, התרבות והמנהגים בשגרה,<br/>
בכדי לשפר את התקשורת ולקדם היענות בשעת חירום.<br/><br/>
התוכן מיועד לאנשי פיקוד העורף העוסקים בתחום האוכלוסייה<br/>
ונגיש לכל מי שרוצה לעמוד על השוני והייחודיות,<br/>
המתקיימת במקביל בתוך גבולות המדינה.
 <br/>

 </p>
 
 <button className='home-button' onClick={goToMenu}>יוצאים לדרך</button>

<div className='greeting-div'>
       <img
    src={`${process.env.PUBLIC_URL}/assets/imgs/pakarorange.svg`}
    className='pakar-logo'

    />
    <img
    src={`${process.env.PUBLIC_URL}/assets/imgs/pakarGrey.svg`}
    className='pakar-grey'
    />

    <img
    src={`${process.env.PUBLIC_URL}/assets/imgs/collegeLogo.png`}
    className='collage-logo'
    />
    <p className='credits'>עזר זה מוגש בזכות שיתוף פעולה בין  ענף התנהגות במחלקת אוכלוסייה ובין המכללה הלאומית לאיתנות ישראלית. 
    </p>
</div>
 
<div className="footer"></div>
    </div>
  );
};

export default Home;