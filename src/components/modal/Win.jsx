import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";

/**
 * Win component for the game modal.
 * This component renders the game win modal.
 * 
 * @returns {JSX.Element} - The rendered Win component.
 */
const Win = () => {
  // Get the game state from the GameContext.
  const { winner, handleNextRound, handleReset } = useContext(GameContext);

  return (
    <div className="score">
      {/* Render the win message */}
      {winner && winner !== "no" ? (
        <>
          <p>yoy win!</p>
          <h3
            className={`score__title ${
              winner === "o" ? "text-yellow" : "text-blue"
            } `}
          >
            {/* Render the winner's icon */}
            {winner === "x" && <Xicon />}
            {winner === "o" && <Oicon />}
            Takes the round
          </h3>
        </>
      ) : (
        <h3 className="score__title text-yellow">No Winner !</h3>
      )}

      {/* Render the buttons for quitting or next round */}
      <div className="score__btns">
        <button className="btn btn-sm" onClick={handleReset}>
          Quit
        </button>
        <button
          className={`btn   btn-sm ${
            winner === "x" ? "btn-yellow" : "btn-blue"
          }`}
          onClick={handleNextRound}
        >
          Next Round
        </button>
      </div>
    </div>
  );
};

export default Win;