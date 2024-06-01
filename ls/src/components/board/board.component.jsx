import React, { useState, useEffect } from 'react';
import './board.css';
import Cell from '../cell/cell.component';

function Board(props) {
    
    

    const initializeBoard = () => {
        let board = [];
        for (let i = 0; i < props.rows; i++) {
            board.push([]);
            for (let j = 0; j < props.cols; j++) {
                board[i].push({
                    x: j,
                    y: i,
                    bombs: 0,
                    isOpen: false,
                    hasMine: false,
                    hasFlag: false,
                });
            }
        }

        // Adiciona minas
        for (let i = 0; i < props.mines; i++) {
            let randomRow = Math.floor(Math.random() * props.rows);
            let randomCol = Math.floor(Math.random() * props.cols);
            let cell = board[randomRow][randomCol];

            if (cell.hasMine) {
                i--;
            } else {
                cell.hasMine = true;
            }
        }
        console.log(board);
        return board;
    };

    const [board, setBoard] = useState(initializeBoard());

    // Contar bombas ao redor de cada célula
    useEffect(() => {
        const newBoard = board.map(row => row.map(cell => {
            if (!cell.hasMine) {
                let bombs = 0;
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        const newRow = cell.y + y;
                        const newCol = cell.x + x;
                        if (newRow >= 0 && newRow < props.rows && newCol >= 0 && newCol < props.cols && board[newRow][newCol].hasMine) {
                            bombs++;
                        }
                    }
                }
                cell.bombs = bombs;
            }
            return cell;
        }));
        setBoard(newBoard);
    }, []); 
    

    const handleCellClick = (x, y) => {
       //debugger
        let newBoard = [...board];
        let cell = newBoard[y][x];

        if (cell.isOpen || cell.hasFlag) return;

        cell.isOpen = true;
        props.turnCell(cell);
        if (cell.bombs === 0 && !cell.hasMine) {
            // Abrir todas as células adjacentes se não houver bombas ao redor
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (x + i >= 0 && x + i < props.cols && y + j >= 0 && y + j < props.rows) {
                        if (!newBoard[y + j][x + i].isOpen) {
                            handleCellClick(x + i, y + j);
                        }
                    }
                }
            }
        }

        if (cell.hasMine === true && !cell.hasFlag){
          // Se abrir uma mina
          console.log("mina!");
          revealAll();
          window.alert("Game Over!");
          props.lose();
        }

        setBoard(newBoard);
    };

    /*useEffect(() => {
        const board = initializeBoard();
        setBoard(board);
    },[props.mines]);*/

    useEffect(() => {
        if (props.open + props.mines === props.rows*props.cols) {
            console.log("win");
            //window.alert("You Win!");
           props.win();
           revealAll();
        }
     }, [props.open]);

    const revealAll = (x,y) => {
      let newBoard = [...board];
      for (let i = 0; i<props.rows; i++){
        for (let j = 0; j<props.cols; j++){
          let cell = newBoard[i][j];
          if (cell.isOpen == false)
            cell.isOpen = true;
        }
      }
      setBoard(newBoard);
    };

    const handleRightClick = (e, x, y) => {
        e.preventDefault();
        let newBoard = [...board];
        let cell = newBoard[y][x];

        if (cell.isOpen) return;

        cell.hasFlag = !cell.hasFlag;
        setBoard(newBoard);
    };

    return (
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map(cell => (
                            <Cell
                                key={`${cell.x}-${cell.y}`}
                                {...cell}
                                onClick={() => handleCellClick(cell.x, cell.y)}
                                onContextMenu={(e) => handleRightClick(e, cell.x, cell.y)}
                            />
                        ))}
                    </div>
                ))}
            </div>
    );
};
export default Board;
