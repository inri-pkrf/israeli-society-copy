import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../componentsCSS/GameExplaine.css';

const GameExplaine = () => {
  const navigate = useNavigate();


 
  return (
    <div id="game-explaine">
        <h3 className="part-titlethree">חלק שלישי
        </h3>
      <h1 className="gameExp-title" > קווים משיקים
בין החברה החרדית לערבית


      </h1>
      <p className='instructions-game'> לפניך משחק בו יש לזהות מהם המאפיינים המשותפים בין החברה החרדית והערבית. 

המשפטים יתחלפו במסך, יש לקרוא את המשפט לתפוס ולגרור למקום המתאים (אם לדעתך מסמל מאפיין מקביל או לא)
       </p>
      <button className="next-button-game-ex" onClick={() => navigate('/game')}>
           יאללה למשחק
          </button>
   

 
<div className="footer"></div>
    </div>
  );
};

export default GameExplaine;