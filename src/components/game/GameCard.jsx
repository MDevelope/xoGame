import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";

/**
 * GameCard component represents a single square in the game board.
 * 
 * @param {Object} props - The props object containing the following properties:
 *   @param {boolean} active - Indicates if the square is active.
 *   @param {string} [user="nouser"] - The mark of the player in the square.
 *   @param {number} index - The index of the square.
 * @returns {JSX.Element} - The rendered GameCard component.
 */
const GameCard = ({ active, user = "nouser", index }) => {
  // Get the handleSquareClick function from the GameContext.
  const { handleSquareClick } = useContext(GameContext);

  // Render the GameCard component.
  return (
    <div
      className={`card ${active && user === "x" && "shadow-blue"} ${
        active && user === "o" && "shadow-yellow"
      } ${active ? "active" : "shadow-gray"}`}
      onClick={() => handleSquareClick(index)}
    >
      {/* Render the Xicon component if the user is "x" */}
      {user === "x" && <Xicon color={active && "dark"} size="lg" />}
      {/* Render the Oicon component if the user is "o" */}
      {user === "o" && <Oicon color={active && "dark"} size="lg" />}
    </div>
  );
};

export default GameCard;