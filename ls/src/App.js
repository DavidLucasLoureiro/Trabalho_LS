import GamePanel from "./components/game-panel/game-panel.component";
import './assets/styles/App.css';
import Board from "./components/game-panel/game-panel.component";
import Timer from "./components/game-panel/game-panel.component";

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
