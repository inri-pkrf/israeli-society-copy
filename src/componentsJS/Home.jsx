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
      <h2 className='home-title'>  ברוכים וברוכות הבאים והבאות   <br></br>לשיעור דיגיטלי על החברה הישראלית

 </h2>
 <p className="info1">
בסיום לומדה זו תכירו את רבדי החברה הישראלית,
מה משפיע על החלטות ופעולות של אזרחים מהחברה הערבית והחרדית,
בני ובנות הגיל השלישי ואנשים עם מוגבלויות.<br/><br/>
בעזרת מוצר זה תוכלו להכיר את אורחות החיים, התרבות והמנהגים בשגרה,
בכדי לשפר את התקשורת ולקדם היענות בשעת חירום.<br/><br/>
התוכן מיועד לאנשי פיקוד העורף העוסקים בתחום האוכלוסייה
ונגיש לכל מי שרוצה לעמוד על השוני והייחודיות,
המתקיימת במקביל בתוך גבולות המדינה.
<br/>

 </p>
 
 <button className='home-button' onClick={goToMenu}>יוצאים לדרך</button>
 
<div className="footer"></div>
    </div>
  );
};

export default Home;