import React from 'react';
import './game-over-modal.css'; 

const GameOverModal = (props) => {
    if (props.game !== "ended") return null;

    const getModalClass = () => {
        debugger
        if (props.diff === "0") {
            return "modal-easy";
        } else if (props.diff === "1") {
            return "modal-medium";
        } else if (props.diff === "2") {
            return "modal-hard";
        }
    };

    return (
        <div className={`game-over-modal ${getModalClass()}`}>  
            <div className="game-over-content">
                <h2>{props.result ? "You Win!" : "You Lose!"}</h2>
            </div>
        </div>
    );
};

export default GameOverModal;