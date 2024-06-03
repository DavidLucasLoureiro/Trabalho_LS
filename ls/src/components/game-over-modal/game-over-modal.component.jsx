import React, { useEffect, useState } from 'react';
import './game-over-modal.css'; 

const GameOverModal = (props) => {
    if (props.game!== "ended") return null; // Se o jogo não terminou, não renderiza nada

    // Função para obter a classe do modal com base no resultado do jogo
    const getModalClass = () => {
        if(props.result===true){
            return "modal-ganhar";
        }else{
            return "modal-perder";
        }
    };

    

    return (
        <div className="game-over-modal" disabled={props.result}>  
            <div className={`game-over-content ${getModalClass()}`}>
                <h2>{props.result ? "Ganhas-te 👍!" : "Perdes-te 🙁!"}</h2>
            </div>
        </div>
    );
};

export default GameOverModal;