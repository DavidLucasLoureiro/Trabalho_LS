import React, { useEffect, useState } from 'react';
import './game-over-modal.css'; 

function GameOverModal(props) {

    if (props.game!== "ended") return null;

    const getModalClass = () => {
        if(props.result===true){
            return "modal-win";
        }else{
            return "modal-lose";
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