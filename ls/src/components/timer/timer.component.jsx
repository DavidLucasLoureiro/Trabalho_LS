import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Timer( props ) {
    useEffect(() => {
        if (props.game === "started") {
          const interval = setInterval(() => {
            props.setTime(prevTime => prevTime + 1);
          }, 1200);
          return () => clearInterval(interval);
        }
      }, [props.game]);
      return (
        <div className="timer">
            <img src="img/timer.png" alt="timer" />
            <span className="time-count">{props.time}</span>
        </div>
    );
}