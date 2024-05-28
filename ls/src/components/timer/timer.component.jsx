import React from 'react';

const Timer = ({ time }) => {
    return (
        <div className="timer">
            <img src="img/timer.png" alt="timer" />
            <span className="time-count">{time}</span>
        </div>
    );
};

export default Timer;
