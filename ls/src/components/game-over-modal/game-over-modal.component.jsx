import React from 'react';
import './game-over-modal.css';

const GameOverModal = ({ isGameOver, onRestart }) => {
    if (!isGameOver) return null;
    return (
        <div className="game-over-modal">
            <div className="game-over-content">
                <h2>Game Over</h2>
                <button onClick={onRestart}>Restart</button>
            </div>
        </div>
    );
};

export default GameOverModal;
