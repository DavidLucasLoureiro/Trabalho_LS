import React, { useState,useEffect } from 'react';
import './cell.css';

const Cell = ({ x, y, isOpen, hasMine, hasFlag, hasQuestion, bombs, onClick, onContextMenu,game }) => {

    let cellClass = 'cell';
    if (isOpen) cellClass += ' open';
    if ((x+y) % 2 === 0) cellClass += ' even';
    
    return (
        <div className={cellClass} onClick={onClick} onContextMenu={onContextMenu}>
            {
            game === "ended" && (hasFlag || hasQuestion) && hasMine ? (
                <img src="/img/bomb-correct.png" alt="correct" className="flag-image" />
            ) : game === "ended" && (hasFlag || hasQuestion) && !hasMine ? (
                <img src="/img/wrong.png" alt="wrong" className="flag-image" />
            ) : hasQuestion ? (
                <img src="/img/question.png" alt="question" className="flag-image" />
            ) : isOpen && hasMine ? (
                <img src="/img/bomb.png" alt="mine" className="mine-image" />
            ) : hasFlag ? (
                <img src="/img/flag.png" alt="flag" className="flag-image" />
            ) : isOpen && bombs > 0 ? bombs : ''
            }
        </div>
    );
};

export default Cell;
