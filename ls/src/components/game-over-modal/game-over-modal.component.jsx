import React from 'react';
import './game-over-modal.css';

const GameOverModal = ({ game, resetGame, result }) => {
    if (game !== "ended") return null;

    return (
        <div className="game-over-modal">
            <div className="game-over-content">
                <h2>{result ? "You Win!" : "You Lose!"}</h2>
            </div>
        </div>
    );
};

export default GameOverModal;