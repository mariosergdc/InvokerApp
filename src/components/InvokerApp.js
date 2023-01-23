import { useEffect } from 'react';
import { useState } from 'react';
import './invokerapp.css';
import Element from './Element';
import Spell from './Spell';

//const initTimer = 60;
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
let bestScore = JSON.parse(localStorage.getItem('bestRecord')) || 0;

function InvokerApp() {
  //1 elementos quas wex exort
  const [elements, setElements] = useState(initElements);

  //2 echizos listos pa lanzar string con el nombre completo del echizo
  const [spells, setSpells] = useState(initSpells);

  //3 estado pa llevar el tiempo de juego transcurrido
  const [timer1, setTimer1] = useState(60);

  //4 estado pa guardar el intervalo de setInterval
  const [inter, setInter] = useState(null);

  //4.1 guardar timeout pa limpiarlo desp
  const [deleteTimeout, setDeleteTimeout] = useState(null);

  //5 el poder que hay que lanzar
  const [reto, setReto] = useState(null);

  //6 puntuacion que lleva  jugando...
  const [score, setScore] = useState(0);

  //7 global score
  const [globalScore, setGlobalScore] = useState(bestScore);

  //8 esta jugando??
  const [jugando, setJugando] = useState(false);

  //9 pa useeffect
  const [detenerbool, setDetenerbool] = useState(false);
  console.log(detenerbool);

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
      //crea arreglo nuevo que para actualizar echizos
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
      if (spellTypes[reto] === spells[0]) {
        if (jugando) {
          setScore(score + 1);
        }
        const number = Math.round(Math.random() * 9);
        setReto(number);
      }
    } else if (e.key === 'f') {
      if (spellTypes[reto] === spells[1]) {
        if (jugando) {
          setScore(score + 1);
        }

        const number = Math.round(Math.random() * 9);
        setReto(number);
      }
    }
    //tecla enter lo mismo q boton start
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (!jugando) Start();
    }
    /* console.log(e.key);
    console.log(e.key.charCodeAt(0)); */
  };

  const Start = () => {
    const number = Math.round(Math.random() * 9);
    // inicia el echizo q hay q lanzar numero
    setReto(number);
    //variable jugando true iniciar juego
    setJugando(true);
    //record actual jugando 0
    setScore(0);

    /* const intervalo = setInterval(() => {
      console.log("setinterval");
      let tiempo = timer1 - 1;
      setTimer1(tiempo);
    }, 1000);
    setInter(intervalo); */

    const intervalo = setInterval(() => {
      setTimer1((prevState) => prevState - 1);
    }, 1000);
    setInter(intervalo);

    //no ve los estados hay q limpiar el settime out
    const timeout = setTimeout(() => {
      console.log('settimeouttttt');
      detenerbool ? setDetenerbool(false) : setDetenerbool(true);
    }, 60000);
    setDeleteTimeout(timeout);
  };

  useEffect(() => {
    console.log(' use effect cambio detener bool');
    let bestSco = parseInt(globalScore);

    if (score > bestSco) {
      localStorage.setItem('bestRecord', JSON.stringify(score));
      setGlobalScore(score);
    }

    setElements(initElements);
    setSpells(initSpells);
    clearInterval(inter);
    setInter(null);
    clearTimeout(deleteTimeout);
    setDeleteTimeout(null);
    setTimer1(60);
    setJugando(false);
    setReto(null);
  }, [detenerbool]);

  const Stop = () => {
    console.log('entro al stoppppppp');
    detenerbool ? setDetenerbool(false) : setDetenerbool(true);
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
          {/* <div className="switch fe"> */}
          <div className={jugando ? 'switch fe' : 'switch'}>
            {jugando ? (
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
              (timer1 < 31 && timer1 > 15 && 'yellow') ||
              (timer1 < 16 && 'red'),
          }}
        >
          {timer1}
        </div>

        <div className="container challenge-container">
          <div className="label container">
            {reto !== null && <h4>Cast this spell</h4>}
          </div>

          <div className="challenge-spell">
            {reto !== null && (
              <img src={`/photos/spells/${spellTypes[reto]}.png`} alt="spell" />
            )}
          </div>
        </div>
        <div className="record">{score}</div>

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
