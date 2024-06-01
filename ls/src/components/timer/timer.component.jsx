import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Timer( props ) {
    useEffect(() => {
        if (props.game === "started") {
          const interval = setInterval(() => {
            props.setTime(prevTime => prevTime + 10);
          }, 10);
          return () => clearInterval(interval);
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