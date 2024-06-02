import React from 'react';
import './cell.css';

const Cell = ({ x, y, isOpen, hasMine, hasFlag, bombs, onClick, onContextMenu }) => {
    let cellClass = 'cell';
    if (isOpen) cellClass += ' open';

    return (
        <div className={cellClass} onClick={onClick} onContextMenu={onContextMenu}>
            {isOpen && hasMine ? (
                <img src="/img/bomb.png" alt="mine" className="mine-image" />
            ) : (
                hasFlag ? (
                    <img src="/img/flag.png" alt="flag" className="flag-image" />
                ) : (
                    isOpen && bombs > 0 ? bombs : ''
                )
            )}
        </div>
    );
};

export default Cell;
