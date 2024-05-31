import './assets/styles/App.css';
import Timer from "./components/timer/timer.component";
import Header from './components/header/header.component';
import Board from "./components/board/board.component";
import Cell from "./components/cell/cell.component";
import Modal from "./components/game-over-modal/game-over-modal.component";
import { useEffect, useState } from 'react'

function App() {
  const [game, setGame] = useState("wait");
  const [open, setOpen] = useState(0);

  useEffect (() => {
    if(game==="started"){
      console.log("start");
    }
  },[game]);

  const win = () => {
    setGame("ended");
    //setResult("win");
  };
  const lose = () => {
    setGame("ended");
    //setResult("lose");
  };

  const turnCell = (cell) => {
    if (open === 0 && game !== "started") {
      setGame("started");
    }
    if(cell.isOpen){
      setOpen(open => open + 1);
    }
  };


  return (
    <div id="container">
      <main>
      <Board
      game={game}
      win = {win}
      lose = {lose}
      turnCell = {turnCell}
      open = {open}
      />
      <Header
      />

      </main>
    </div>
  );
}
export default App;
