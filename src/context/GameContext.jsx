import { createContext, useEffect, useState, useContext } from "react";
import calcBestMove, { calcWinner } from "../helpers/calcSquares";
import { ModalContext } from "./ModalContext";

const GameContext = createContext();

const GameState = (props) => {
  const [screen, setScreen] = useState("start"); // start || game
  const [playMode, setPlayMode] = useState("user"); // user || cpu
  const [activeUser, setActiveUser] = useState("x"); // x || o
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [xnext, setXnext] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerLine, setWinnerLine] = useState(null);
  const [ties, setTies] = useState({ x: 0, o: 0 });

  const { showModal, hideModal, setModalMode } = useContext(ModalContext);

  useEffect(() => {
    //check if cpu turn
    let currentUser = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser !== activeUser && !winner) {
      cpuNextMove(squares);
    }
    checkNoWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xnext, winner, screen]);

  const handleStart = (player) => {
    setPlayMode(player);
    setScreen("game");
  };

  /**
   * Handles the click event on a square in the game board.
   *
   * @param {number} ix - The index of the clicked square.
   */
  const handleSquareClick = (ix) => {
    // If the square is already occupied or there is a winner, return.
    if (squares[ix] || winner) {
      return;
    }

    // Determine the current user based on the turn order.
    let currentUser = xnext ? "o" : "x";

    // If the play mode is CPU and the current user is not the active user, return.
    if (playMode === "cpu" && currentUser !== activeUser) {
      return;
    }

    // Create a copy of the squares array.
    let ns = [...squares];

    // Update the clicked square with the current user's symbol.
    ns[ix] = !xnext ? "x" : "o";

    // Update the state with the new squares array.
    setSquares(ns);

    // Toggle the turn order.
    setXnext(!xnext);

    // Check if there is a winner after the move.
    checkWinner(ns);
  };

  /**
   * Checks if there is a winner in the game.
   *
   * @param {Array} ns - The current state of the game board.
   */
  const checkWinner = (ns) => {
    // Determine if there is a winner
    const isWinner = calcWinner(ns);
    
    // If there is a winner, update the state accordingly
    if (isWinner) {
      // Set the winner and line
      setWinner(isWinner.winner);
      setWinnerLine(isWinner.line);
      
      // Increment the number of ties for the winner
      const nties = { ...ties };
      nties[isWinner.winner] += 1;
      setTies(nties);
      
      // Show the modal and set the modal mode to "winner"
      showModal();
      setModalMode("winner");
    }
  };

  /**
   * Calculates the next move for the CPU player.
   *
   * @param {Array} sqrs - The current state of the game board.
   */
  const cpuNextMove = (sqrs) => {
    // Determine the opponent's symbol
    const opponentSymbol = activeUser === "x" ? "o" : "x";

    // Calculate the best move for the CPU player
    let bestmove = calcBestMove(sqrs, opponentSymbol);

    // Create a copy of the squares array
    let ns = [...squares];

    // Make the CPU player's move
    ns[bestmove] = !xnext ? "x" : "o";

    // Update the state with the new move
    setSquares(ns);

    // Update the xnext state to toggle player turns
    setXnext(!xnext);

    // Check for a winner after the CPU player's move
    checkWinner(ns);
  };

  /**
   * Resets the game state to the initial state.
   * Sets squares to a new array filled with empty strings.
   * Sets xnext to false.
   * Sets winner to null.
   * Sets winnerLine to null.
   * Sets activeUser to "x".
   * Sets ties to an object with x and o properties set to 0.
   * Hides the modal.
   * Sets screen to "start".
   */
  const handleReset = () => {
    // Reset squares to a new array filled with empty strings
    setSquares(new Array(9).fill("")); 

    // Set xnext to false
    setXnext(false); 

    // Set winner to null
    setWinner(null); 

    // Set winnerLine to null
    setWinnerLine(null); 

    // Set activeUser to "x"
    setActiveUser("x"); 

    // Set ties to an object with x and o properties set to 0
    setTies({ x: 0, o: 0 }); 

    // Hide the modal
    hideModal(); 

    // Set screen to "start"
    setScreen("start"); 
  };

  /**
   * Resets the game board to an empty state and switches the active player.
   * If the current winner is "x", the new active player will be "o".
   * Otherwise, the new active player will be "x".
   * Resets the winner and winner line state.
   * Hides the modal.
   */
  const handleNextRound = () => {
    // Reset squares to a new array filled with empty strings
    setSquares(new Array(9).fill(""));

    // Switch active player
    setXnext(winner === "x");

    // Reset winner and winner line state
    setWinner(null);
    setWinnerLine(null);

    // Hide the modal
    hideModal();
  };

  /**
   * Checks if there are any empty squares left on the game board.
   * If there are no empty squares, sets the winner state to "no" and shows the modal.
   */
  const checkNoWinner = () => {
    // Get the number of empty squares
    const moves = squares.filter((sq) => sq === "");

    // If there are no empty squares, set the winner to "no" and show the modal
    if (moves.length === 0) {
      setWinner("no"); // Set the winner state to "no"
      showModal(); // Show the modal
      setModalMode("winner"); // Set the modal mode to "winner"
    }
  };

  return (
    <GameContext.Provider
      value={{
        squares,
        winner,
        winnerLine,
        xnext,
        ties,
        screen,
        activeUser,
        playMode,
        handleStart,
        setActiveUser,
        setPlayMode,
        setTies,
        handleSquareClick,
        handleReset,
        handleNextRound,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameState };