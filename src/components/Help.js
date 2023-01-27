import React from 'react';

//tipo de echizos
const spellTypes = [
  'stun',
  'invisivility',
  'icewall',
  'emp',
  'tornado',
  'alacrity',
  'desarme',
  'sunstrike',
  'bichos',
  'meteorito',
];

//Nombre de echizos para UI
const spellNames = [
  'Cold Snap',
  'Ghost Walk',
  'Ice Wall',
  'E.M.P',
  'Tornado',
  'Alacrity',
  'Deafening Blast',
  'Sun Strike',
  'Forge Spirit',
  'Chaos Meteor',
];

//combinacion
const conbination = [
  'q q q',
  'q q w',
  'q q e',
  'w w w',
  'w w q',
  'w w e',
  'q w e',
  'e e e',
  'e e q',
  'e e w',
];

const Help = ({ openHelp }) => {
  return (
    <div className={openHelp ? 'help' : 'help help-closed'}>
      <div className="help-grid-container">
        {spellTypes.map((el, i) => {
          return (
            <div className="row" key={i}>
              <div className="column1">{spellNames[i]}</div>
              <div className="column2">
                <img
                  className="help-img"
                  src={`photos/spells/${el}.png`}
                  alt=""
                />
              </div>
              <div className="column3">{conbination[i]}</div>
            </div>
          );
        })}
        <br />
        <div className="row">
          <div>make spell:</div>
          <div className="column4">
            <strong>r</strong>
          </div>
        </div>
        <div div className="row">
          <div>cast spall:</div>
          <div className="column4">
            <strong>d</strong> and <strong>f</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
