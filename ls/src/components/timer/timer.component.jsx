import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Timer( props ) {
    // Hook useEffect para configurar e limpar o intervalo do temporizador
    useEffect(() => {
        if (props.game === "started") {
          // Inicia um intervalo que incrementa o tempo a cada 10 milissegundos
          const interval = setInterval(() => {
            props.setTime(prevTime => prevTime + 10);  // Incrementa o tempo
          }, 10);
          return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado ou quando o jogo para
        }
      }, [props.game]);
      return (
        <div className="timer">
            <img src="img/timer.png" alt="timer" />
            <span className="time-count">{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
            <span className="time-count">{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}</span>
        </div>
    );
}