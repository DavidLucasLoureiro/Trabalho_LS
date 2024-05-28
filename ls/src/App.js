import './assets/styles/App.css';
import Timer from "./components/timer/timer.component";
import Header from './components/header/header.component';
import Board from "./components/board/board.component";
import Cell from "./components/cell/cell.component";
import Modal from "./components/game-over-modal/game-over-modal.component";
import { useState } from 'react'

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div id="container">
      <main>
      <Board/>
      <Header/>

      </main>
    </div>
  );
}
export default App;
