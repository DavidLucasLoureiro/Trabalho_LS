import React from 'react';
import './header.css';
import Timer from '../timer/timer.component';

const Header = () => {
    return(
        <div className="minesweeper">
            <h1>Minesweeper</h1>
            <div className="board-head">
                <div className="level">Level: Easy</div>
                <div className="center">
                    <div className="flags">
                        <img src="img/flag.png" alt="flag" />
                        <span className="mines-count">10</span>
                    </div>
                    <Timer time={0} />
                    <button className="reset">
                        <img src="img/reset.png" alt="reset" />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Header;