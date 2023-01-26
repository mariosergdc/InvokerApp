/***App made by Mario Sergio Domínguez Consuegra***/
/***mariosergdc.webdev@gmail.com***/
/***linkedin.com/in/mario-domínguez-consuegra-460609248***/

import React from 'react';
function Spell({ type, char }) {
  return (
    <div className="spell">
      {type && <img src={`photos/spells/${type}.png`} alt="" />}
      <div className={char === 'D' ? 'char-d' : 'char-f'}>{char}</div>
    </div>
  );
}

export default Spell;
