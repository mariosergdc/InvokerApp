/***App made by Mario Sergio Domínguez Consuegra***/
/***mariosergdc.webdev@gmail.com***/

import { useEffect, useRef } from 'react';
import { useState } from 'react';
import './invokerapp.css';
import Element from './Element';
import Spell from './Spell';

//elementos quas wex exort
const initElements = ['', '', ''];

//echizos listos pa lanzar
const initSpells = ['', ''];

//tipo de echizos
const spellTypes = [
  'stun',
  'invisivility',
  'icewall',
  'emp',
  'tornado',
  'aclarity',
  'desarme',
  'sunstrike',
  'bichos',
  'meteorito',
];

//lee bestScore del local storage
let bestScore = JSON.parse(localStorage.getItem('bestScore')) || 0;

function InvokerApp() {
  //1 elementos quas wex exort
  const [elements, setElements] = useState(initElements);

  //2 echizos listos pa lanzar string con el nombre completo del echizo
  const [spells, setSpells] = useState(initSpells);

  //3 estado para llevar el tiempo de juego transcurrido
  const [timer, setTimer] = useState(60);

  //4 estado para guardar el intervalo de setInterval
  const [inter, setInter] = useState(null);
  const interRef = useRef();
  interRef.current = inter;

  //5 estado para guardar timeout para limpiarlo despues
  const [deleteTimeout, setDeleteTimeout] = useState(null);
  const deleteTimeoutRef = useRef();
  deleteTimeoutRef.current = deleteTimeout;

  //6 el poder que hay que lanzar
  const [challenge, setChallenge] = useState(null);

  //7 puntuacion que lleva  jugando...
  const [score, setScore] = useState(0);
  const scoreRef = useRef();
  scoreRef.current = score;

  //8 global score, puntuacion maxima alcanzada en juegos anteriores
  const [globalScore, setGlobalScore] = useState(bestScore);

  //9 esta jugando??
  const [playing, setPlaying] = useState(false);

  //funcion que se ejecuta cuando se presiona una tecla
  const keydown = (e) => {
    //actualiza los elementos si tecla es q w e
    if (e.key === 'q' || e.key === 'w' || e.key === 'e') {
      let newElements = new Array(3);
      newElements[0] = elements[1];
      newElements[1] = elements[2];
      newElements[2] = e.key;
      setElements(newElements);
    }
    //si tecla es r y no estan vacios los elementos ve que poder se forma
    else if (
      e.key === 'r' &&
      elements[0] !== '' &&
      elements[1] !== '' &&
      elements[2] !== ''
    ) {
      //crea arreglo nuevo que para actualizar hechizos
      let newSpell = new Array(2);
      newSpell[1] = spells[0];
      let value =
        elements[0].charCodeAt(0) +
        elements[1].charCodeAt(0) +
        elements[2].charCodeAt(0);
      if (
        value === 339 &&
        elements[0] === 'q' &&
        elements[1] === 'q' &&
        elements[2] === 'q'
      ) {
        newSpell[0] = spellTypes[0];
      } else if (value === 345) {
        newSpell[0] = spellTypes[1];
      } else if (value === 327) {
        newSpell[0] = spellTypes[2];
      } else if (value === 357) {
        newSpell[0] = spellTypes[3];
      } else if (value === 351) {
        newSpell[0] = spellTypes[4];
      } else if (value === 339) {
        newSpell[0] = spellTypes[5];
      } else if (value === 333) {
        newSpell[0] = spellTypes[6];
      } else if (value === 303) {
        newSpell[0] = spellTypes[7];
      } else if (value === 315) {
        newSpell[0] = spellTypes[8];
      } else if (value === 321) {
        newSpell[0] = spellTypes[9];
      }

      //si el echizo atual es igual que el q esta en la posicion 0 no hacer nada
      if (newSpell[0] === spells[0]) {
        return;
        //si el echizo atual es igual que el q esta en la posicion 1 intercambiarlos
      } else if (newSpell[0] === spells[1]) {
        let aux = spells[0];
        newSpell[0] = spells[1];
        newSpell[1] = aux;
      }
      //actualizar echizos
      setSpells(newSpell);
    }
    //si tecla d lanzar echizo
    else if (e.key === 'd') {
      if (spellTypes[challenge] === spells[0]) {
        if (playing) {
          setScore(score + 1);
        }
        let number = Math.round(Math.random() * 9);
        while (number === challenge) {
          number = Math.round(Math.random() * 9);
        }
        setChallenge(number);
      }
    } else if (e.key === 'f') {
      if (spellTypes[challenge] === spells[1]) {
        if (playing) {
          setScore(score + 1);
        }

        let number = Math.round(Math.random() * 9);
        while (number === challenge) {
          number = Math.round(Math.random() * 9);
        }
        setChallenge(number);
      }
    }
    //tecla enter lo mismo q boton start
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (!playing) Start();
    }
  };

  const Start = () => {
    const number = Math.round(Math.random() * 9);
    // inicia el echizo q hay q lanzar numero
    setChallenge(number);
    //variable jugando true iniciar juego
    setPlaying(true);
    //puntuacion actual jugando 0
    setScore(0);

    const intervalo = setInterval(() => {
      setTimer((prevState) => prevState - 1);
    }, 1000);
    setInter(intervalo);

    const timeout = setTimeout(() => {
      Stop();
    }, 60000);
    setDeleteTimeout(timeout);
  };

  const Stop = () => {
    let bestSco = parseInt(globalScore);
    //si la puntuacion actual es mejor que las anteriores actualizar mejor puntuacion
    if (scoreRef.current > bestSco) {
      localStorage.setItem('bestScore', JSON.stringify(scoreRef.current));
      setGlobalScore(scoreRef.current);
    }
    setElements(initElements);
    setSpells(initSpells);
    clearInterval(interRef.current);
    setInter(null);
    interRef.current = null;
    clearTimeout(deleteTimeoutRef.current);
    setDeleteTimeout(null);
    deleteTimeoutRef.current = null;
    setTimer(60);
    setPlaying(false);
    setChallenge(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  });

  return (
    <div className="bg">
      <div className="main-container">
        <div className="container header">
          <h3>Invoker Dota2</h3>
          <div>Best Score: {globalScore}</div>
        </div>
        <div className="switch-container container">
          <div className={playing ? 'switch fe' : 'switch'}>
            {playing ? (
              <>
                <button className="btn-stop" onClick={Stop}>
                  Stop
                </button>
              </>
            ) : (
              <>
                <button className="btn-start" onClick={Start}>
                  Start
                </button>
              </>
            )}
          </div>
        </div>
        <div
          className="container timer"
          style={{
            color:
              (timer < 31 && timer > 15 && 'yellow') || (timer < 16 && 'red'),
          }}
        >
          {timer}
        </div>

        <div className="container challenge-container">
          <div className="label container">
            {challenge !== null && <h4>Cast this spell</h4>}
          </div>

          <div className="challenge-spell">
            {challenge !== null && (
              <img
                src={`/photos/spells/${spellTypes[challenge]}.png`}
                alt="spell"
              />
            )}
          </div>
        </div>
        <div className="score">{score}</div>

        <div className="elements">
          <Element data={elements[0]} />
          <Element data={elements[1]} />
          <Element data={elements[2]} />
        </div>

        <div className="spells-box">
          <img src="photos/elementos.png" alt="" />
          <div className="spells-container">
            <Spell char="D" type={spells[0]} />
            <Spell char="F" type={spells[1]} />
          </div>
          <img src="photos/r.png" alt="" />
        </div>

        <br />
      </div>
    </div>
  );
}

export default InvokerApp;
