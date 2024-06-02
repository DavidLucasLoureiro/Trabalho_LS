import React from 'react';
import './header.css';
import '../board/board.component';
import Timer from '../timer/timer.component';

const Header = (props) => {
    return(
        <div className="minesweeper">
            <h1>Minesweeper</h1>
            <div className="board-head">
                <div className="diff">
                    <select className="diff" onChange={props.onDiffChange}>
                        <option value="0">Fácil</option>
                        <option value="1">Médio</option>
                        <option value="2">Avançado</option>
                    </select>
                </div>
                <div className="center">
                    <div className="flags">
                        <img src="img/flag.png" alt="flag" />
                        <span className="mines-count">{props.flags}</span>
                    </div>
                    <Timer 
                        game = {props.game}
                        time = {props.time}
                        setTime = {props.setTime} 
                    />
                    <button onClick={props.resetGame} className="reset">
                        <img src="img/reset.png" alt="reset" />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Header;