import React from 'react';
import './cell.css';

const Cell = ({ x, y, isOpen, hasMine, hasFlag, bombs, onClick, onContextMenu }) => {
    let cellClass = 'cell';
    if (isOpen) cellClass += ' open';
    if (hasMine) cellClass += ' mine';
    if (hasFlag) cellClass += ' flag';

    return (
        <div className={cellClass} onClick={onClick} onContextMenu={onContextMenu}>
            {isOpen && !hasMine && bombs > 0 ? bombs : ''}
        </div>
    );
};

export default Cell;
