import './assets/styles/App.css';
import Timer from "./components/timer/timer.component";
import Header from './components/header/header.component';
import Board from "./components/board/board.component";
import Cell from "./components/cell/cell.component";
import Modal from "./components/game-over-modal/game-over-modal.component";
import GameOverModal from './components/game-over-modal/game-over-modal.component';
import { useEffect, useState } from 'react'

function App() {
   // Declaração de estados utilizando useState
   const [game, setGame] = useState("wait"); // Estado do jogo: "wait", "started", "ended"
   const [open, setOpen] = useState(0); // Número de células abertas
   const [rows, setRows] = useState(9); // Número de linhas do tabuleiro
   const [cols, setCols] = useState(9); // Número de colunas do tabuleiro
   const [mines, setMines] = useState(10); // Número de minas no tabuleiro
   const [flags, setFlags] = useState(10); // Número de bandeiras disponíveis
   const [diff, setDiff] = useState("0"); // Dificuldade do jogo: "0" (fácil), "1" (médio), "2" (difícil)
   const [time, setTime] = useState(0); // Tempo do jogo
   const [key, setKey] = useState(0); // Usado para forçar a re-montagem do componente Board
   const [result, setResult] = useState(""); // Resultado do jogo: true (ganhou) ou false (perdeu)

  // useEffect para ajustar o tamanho do tabuleiro e o número de minas/bandeiras com base na dificuldade selecionada
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
      setCols(16);
      setRows(30);
      setMines(99);
      setFlags(99);
    }
  },[diff])

  // Função para obter a classe CSS do tabuleiro com base na dificuldade
  const getBoardClass = () => {
    if (diff === "0") {
        return "board-easy";
    } else if (diff === "1") {
        return "board-medium";
    } else if (diff === "2") {
        return "board-hard";
    }
};

// Função para alterar a dificuldade do jogo
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

  // useEffect para executar ações quando o estado do jogo muda para "started"
  useEffect(() => {
    if (game === "started") {
      console.log("start");
    }
  }, [game]);

   // Função chamada quando o jogador ganha
  const win = () => {
    setGame("ended");
    setResult(true);
  };

   // Função chamada quando o jogador perde
  const lose = () => {
    setGame("ended");
    setResult(false);
  };

   // Função chamada ao clicar numa célula
  const turnCell = (cell) => {
    if (open === 0 && game !== "started") {
      setGame("started");
    }
    if (cell.isOpen) {
      setOpen(open => open + 1);
    }
  };

  // Função para atualizar o número de bandeiras disponíveis
  const updFlags = (amount) => {
    setFlags(prevFlags => prevFlags + amount);
  };

  // Função para redefinir o número de bandeiras
  const resetFlags = (newFlags) => {
    setFlags(newFlags);
  };

   // Função para reiniciar o jogo
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
          diff={diff}
          resetGame={resetGame}
          result={result}
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
      </main>
    </div>
  );
}

export default App;
