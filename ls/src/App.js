import './assets/styles/App.css';
import Timer from "./components/timer/timer.component";
import Header from './components/header/header.component';
import Board from "./components/board/board.component";
import Cell from "./components/cell/cell.component";
import Modal from "./components/game-over-modal/game-over-modal.component";
import GameOverModal from './components/game-over-modal/game-over-modal.component';
import { useEffect, useState } from 'react'

function App() {
  const [game, setGame] = useState("wait");
  const [open, setOpen] = useState(0);
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(9);
  const [mines, setMines] = useState(10);
  const [flags, setFlags] = useState(10);
  const [diff, setDiff] = useState("0");
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(0); // Usado para forçar a re-montagem do componente Board
  const [result,setResult] = useState(false);

  useEffect(() => {
    if (diff === "0") {
      setCols(9);
      setRows(9);
      setMines(10);
      setFlags(10);
    } else if (diff === "1") {
      setCols(16);
      setRows(16);
      setMines(40);
      setFlags(40);
    } else if (diff === "2") {
      setCols(30);
      setRows(16);
      setMines(99);
      setFlags(99);
    }
  },[diff])


  const getBoardClass = () => {
    if (diff === "0") {
        return "board-easy";
    } else if (diff === "1") {
        return "board-medium";
    } else if (diff === "2") {
        return "board-hard";
    }
};

  const onDiffChange = (event) => {
    const selectedDiff = event.target.value;

    if (selectedDiff === "0") {
      setDiff("0");
    } else if (selectedDiff === "1") {
      setDiff("1");
    } else {
      setDiff("2");
    }
  };

  useEffect(() => {
    if (game === "started") {
      console.log("start");
    }
  }, [game]);

  const win = () => {
    setGame("ended");
    setResult(true);
  };

  const lose = () => {
    setGame("ended");
    setResult(false);
  };

  const turnCell = (cell) => {
    if (open === 0 && game !== "started") {
      setGame("started");
    }
    if (cell.isOpen) {
      setOpen(open => open + 1);
    }
  };

  const updFlags = (amount) => {
    setFlags(prevFlags => prevFlags + amount);
  };

  const resetFlags = (newFlags) => {
    setFlags(newFlags);
  };

  const resetGame = () => {
    setKey(prevKey => prevKey + 1); // Força a re-montagem do componente Board
    setFlags(mines);
    setOpen(0);
    setGame("wait");
    setTime(0);
  };

  return (
    <div id="container">
      <main>
        <Header
          onDiffChange={onDiffChange}
          game={game}
          time={time}
          setTime={setTime}
          flags={flags}
          resetGame={resetGame}
        />
        <Board
          key={key} // Usado para re-montar o componente Board
          game={game}
          win={win}
          lose={lose}
          turnCell={turnCell}
          open={open}
          rows={rows}
          cols={cols}
          mines={mines}
          flags={flags}
          updFlags={updFlags}
          resetFlags={resetFlags}
          getBoardClass={getBoardClass}
      />
      <GameOverModal 
        game = {game}
        result={result}
        resetGame={resetGame}
      />
      </main>
    </div>
  );
}

export default App;
