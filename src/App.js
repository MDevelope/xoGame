import { useContext } from "react";

import Game from "./components/game";
import Start from "./components/start";
import Modal from "./components/modal";
import { GameContext } from "./context/GameContext.jsx";
function App() {
  const { screen } = useContext(GameContext);
  return (
    <div className="App">
      <div className="container">
        {screen === "start" ? <Start /> : <Game />}
      </div>
      <Modal />
    </div>
  );
}

export default App;
