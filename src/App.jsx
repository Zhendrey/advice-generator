import './App.css'
import { useState, useEffect, useRef } from 'react';
import DesktopDivider from './assets/images/pattern-divider-desktop.svg';
import MobileDivider from './assets/images/pattern-divider-desktop.svg';

export default function App() {
  const tablet = 768;
  const isMounted = useRef(false);
  const patternDivider = useRef(null);

  useEffect(() => {
    if (!isMounted.current) {
      fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(obj => setAdvice(obj));
      isMounted.current = true;
    }
  }, []);
  useEffect(()=>{
    function changePatternDivider(){
      if(window.innerWidth > tablet){
        patternDivider.current.src = DesktopDivider
        patternDivider.current.alt = "Desktop pattern divider"
      }else{
        patternDivider.current.src = MobileDivider
        patternDivider.current.alt = "Mobile pattern divider"
      }
    }
    window.addEventListener("resize", changePatternDivider)
    return ()=>{window.removeEventListener("resize", changePatternDivider)}
    //!ALWAYS INCLUDE A CLEAN-UP FUNCTION WHEN WORKING WITH EVENT LISTENERS!!!
  }, [])

  const [advice, setAdvice] = useState(
    {"slip": { "id": '', "advice": "Loading..."}}
  );

  function rollNewAdvice() {
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(obj => setAdvice(obj));
  }

  return (
    <div className="advice-card">
      <p className="advice-card__numeration">{Boolean(advice.slip.id) && `Advice #${advice.slip.id}`}</p>
      <h1 className="advice-card__advice">{advice.slip.advice}</h1>
      <img ref={patternDivider}
        src={window.innerWidth > tablet ? DesktopDivider : MobileDivider}
        alt={window.innerWidth > tablet ? "Desktop pattern divider" : "Mobile pattern divider"}
        className="advice-card__divider" />
      <button onClick={rollNewAdvice} type='button' className="adive-card__dice">
        <img src="./src/assets/images/icon-dice.svg" alt="dice" />
      </button>
    </div>
  )
}