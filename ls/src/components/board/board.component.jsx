import React, { useState, useEffect } from 'react';
import './board.css';
import Cell from '../cell/cell.component';

const Board = () => {
    const rows = 9; // 9 Linhas
    const columns = 9; // 9 Colunas
    const mines = 10;

    const initializeBoard = () => {
        let board = [];
        for (let i = 0; i < rows; i++) {
            board.push([]);
            for (let j = 0; j < columns; j++) {
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
        for (let i = 0; i < mines; i++) {
            let randomRow = Math.floor(Math.random() * rows);
            let randomCol = Math.floor(Math.random() * columns);
            let cell = board[randomRow][randomCol];

            if (cell.hasMine) {
                i--;
            } else {
                cell.hasMine = true;
            }
        }

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
                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns && board[newRow][newCol].hasMine) {
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
        let newBoard = [...board];
        let cell = newBoard[y][x];

        if (cell.isOpen || cell.hasFlag) return;

        cell.isOpen = true;

        if (cell.bombs === 0 && !cell.hasMine) {
            // Abrir todas as células adjacentes se não houver bombas ao redor
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (x + i >= 0 && x + i < columns && y + j >= 0 && y + j < rows) {
                        if (!newBoard[y + j][x + i].isOpen) {
                            handleCellClick(x + i, y + j);
                        }
                    }
                }
            }
        }

        if (cell.hasMine === true){
          // Se abrir uma mina
          console.log("mina!");
          revealMines(x,y);
          window.alert("Game Over!");
        }

        setBoard(newBoard);
    };

    const revealMines = (x,y) => {
      let newBoard = [...board];
      for (let i = 0; i<rows; i++){
        for (let j = 0; j<columns; j++){
          let cell = newBoard[i][j];
          if (cell.hasMine)
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
