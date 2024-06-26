import React, { useEffect, useState } from 'react';
import './header.css';
import '../board/board.component';
import Timer from '../timer/timer.component';
import GameOverModal from '../game-over-modal/game-over-modal.component';

function Header(props) {
    const [isDisabled, setIsDisabled] = useState(false);

    // Efeito para desativar ou ativar o seletor de dificuldade com base no estado do jogo
    useEffect(() => {
        if (props.game === "started") {
            setIsDisabled(true); // Desativar seletor se o jogo tiver começado
        } else {
            setIsDisabled(false); // Ativar seletor se o jogo não tiver começado
        }
    }, [props.game]);


    // Função para obter a classe do cabeçalho com base na dificuldade
    const getHeaderClass = () => {
        if (props.diff === "0") {
            return "header-easy";
        } else if (props.diff === "1") {
            return "header-medium";
        } else if (props.diff === "2") {
            return "header-hard";
        }
    };

    // Função para obter a classe dos créditos com base na dificuldade
    const getCreditsClass = () => {
        if (props.diff === "0") {
            return "credits-easy";
        } else if (props.diff === "1") {
            return "credits-medium";
        } else if (props.diff === "2") {
            return "credits-hard";
        }
    };

    return (
        <div className={`minesweeper ${getHeaderClass()}`}>
            <div className="minesweeper-title">
                <img src="img/bomb-title.png" alt="euro" className="left-image" />
                <h1>Minesweeper</h1>
                <img src="img/bomb-title-rotated.png" alt="euro" className="right-image" />
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
                    <button onClick={props.resetGame} className="reset">
                        <img src="img/reset.png" alt="reset" />
                    </button>
                </div>
            </div>
            <div className="board-result">
                <GameOverModal 
                    game={props.game}
                    result={props.result}
                />
            </div>
            <div className={`credits ${getCreditsClass()}`}>
                <b>Trabalho realizado por:</b> David Loureiro | Pedro Águas | Rodrigo Cabaços
            </div>
        </div>
    );
}

export default Header;
