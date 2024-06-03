import React, { useState,useEffect } from 'react';
import './cell.css';

const Cell = ({ x, y, isOpen, hasMine, hasFlag, hasQuestion, bombs, onClick, onContextMenu,game }) => {

    // Definir a classe da célula com base no estado e posição
    let cellClass = 'cell';
    if (isOpen) cellClass += ' open';
    if ((x+y) % 2 === 0) cellClass += ' even';
    
    return (
        <div className={cellClass} onClick={onClick} onContextMenu={onContextMenu}>
            {
            game === "ended" && (hasFlag || hasQuestion) && hasMine ? (  // Se o jogo acabou e a célula tem uma bandeira ou ponto de interrogação e uma mina correta
                <img src="/img/bomb-correct.png" alt="correct" className="image" />

            ) : game === "ended" && (hasFlag || hasQuestion) && !hasMine ? (  // Se o jogo acabou e a célula tem uma bandeira ou ponto de interrogação mas não tem mina (errado)
                <img src="/img/wrong.png" alt="wrong" className="image" />

            ) : hasQuestion ? (  // Se a célula tem um ponto de interrogação
                <img src="/img/question.png" alt="question" className="image" />

            ) : isOpen && hasMine ? (  // Se a célula está aberta e tem uma mina
                <img src="/img/bomb.png" alt="mine" className="image" />

            ) : hasFlag ? (   // Se a célula tem uma bandeira
                <img src="/img/flag.png" alt="flag" className="image" />

            ) : isOpen && bombs > 0 ? bombs : ''   // Se a célula está aberta e tem bombas adjacentes, mostra o número de bombas
            }
        </div>
    );
};

export default Cell;
