import React from 'react';
import './game-over-modal.css';

const GameOverModal = ({ game, resetGame, result }) => {
    if (game !== "ended") return null;

    return (
        <div className="game-over-modal">
            <div className="game-over-content">
                <h1>{result ? "You Win!" : "You Lose!"}</h1>
                <button onClick={resetGame}>Restart</button>
            </div>
        </div>
    );
};

export default GameOverModal;