import React, { useEffect, useState } from 'react';
import './header.css';
import Timer from '../timer/timer.component';

function Header(props) {
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (props.game === "started") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [props.game]);

    const getHeaderClass = () => {
        if (props.diff === "0") {
            return "header-easy";
        } else if (props.diff === "1") {
            return "header-medium";
        } else if (props.diff === "2") {
            return "header-hard";
        }
    };

    return (
        <div className={`minesweeper ${getHeaderClass()}`}>
            <div className="minesweeper-title">
                <img src="img/bola-de-futebol.png" alt="euro" className="left-image" />
                <h1>Minesweeper</h1>
                <img src="img/bola-de-futebol-rotated.png" alt="euro" className="right-image" />
            </div>
            <div className="board-head">
                <div className="diff">
                    <select className="diff" disabled={isDisabled} onChange={props.onDiffChange}>
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
                        game={props.game}
                        time={props.time}
                        setTime={props.setTime} 
                    />
                    <button className="reset">
                        <img src="img/reset.png" alt="reset" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
