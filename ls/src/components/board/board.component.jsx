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
                    hasQuestion: false
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

    board.forEach(row => row.forEach(cell => {
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
    }));

    return board;
  };

  const [board, setBoard] = useState(initializeBoard());
  const [flagCount, setFlagCount] = useState(props.mines);

  const handleCellClick = (x, y) => {
    let newBoard = [...board];
    let cell = newBoard[y][x];

        if (cell.isOpen || cell.hasFlag || cell.hasQuestion) return;

    cell.isOpen = true;
    props.turnCell(cell);
    if (cell.hasMine && props.open === 0) {
      newBoard = initializeBoard();
      setBoard(newBoard);
    } else {
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

      if (cell.hasMine && cell.bombs === 0) {
        // Se abrir uma mina
        console.log("mina!");
        revealAll();
        window.alert("Game Over!");
        props.lose();
      }

      setBoard(newBoard);
    }
  };

  useEffect(() => {
    const board = initializeBoard();
    setBoard(board);
  }, [props.mines]);

  useEffect(() => {
    if (props.open + props.mines === props.rows * props.cols) {
      console.log("win");
      props.win();
      revealAll();
    }
  }, [props.open]);

    const revealAll = (x,y) => {
      let newBoard = [...board];
      for (let i = 0; i<props.rows; i++){
        for (let j = 0; j<props.cols; j++){
          let cell = newBoard[i][j];
          if (!cell.isOpen){
            cell.isOpen = true;
          }
        }
      }
      setBoard(newBoard);
    };
    useEffect(() => {
      if (props.game === "ended") {
        revealAll();
      }
    }, [props.game]);

  const handleRightClick = (e, x, y) => {
    e.preventDefault();
    let newBoard = [...board];
    let cell = newBoard[y][x];

    if (cell.isOpen) return;
    if (flagCount === 0 && !cell.hasFlag && !cell.hasQuestion) return;

    if(!cell.hasFlag && !cell.hasQuestion){
      cell.hasFlag = true;
      props.updFlags(-1);
  }else if(cell.hasFlag){
      cell.hasFlag = false;
      cell.hasQuestion = true;
      props.updFlags(+1);
  }else if(cell.hasQuestion){
      cell.hasQuestion=false;
  } 
  console.log(cell.hasQuestion);
      setBoard(newBoard);
  };

  return (
    <div className={`board ${props.getBoardClass()}`}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map(cell => (
            <Cell
              game={props.game}
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
}

export default Board;
