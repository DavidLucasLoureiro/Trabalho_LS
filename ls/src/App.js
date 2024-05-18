import './assets/styles/App.css';
import {Timer, Board, Cell, Modal, Header, Footer} from "./components/game-panel/game-panel.component";


function App() {
  return (
    <div id="container">
      <Header />
      <main>
        <Timer
          
        />
        <Board
        
        />

      </main>
      <Footer />
    </div>
  );
}
export default App;
