const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
/**
 * Calculates the winner of the game based on the game board squares.
 * 
 * @param {Array} squares - The game board squares.
 * @returns {Object|null} - An object with the winner and the winning line, or null if no winner.
 */
export function calcWinner(squares) {
  // Iterate over the lines of the game board
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // Destructure the current line
    
    // Check if the first square of the line has a value and if the two subsequent squares have the same value as the first square
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Return the winner and the winning line
      return { winner: squares[a], line: lines[i] };
    }
  }
  
  // If no winner, return null
  return null;
}
  
/**
 * Calculates the best move for the player based on the game board squares.
 * 
 * @param {Array} squares - The game board squares.
 * @param {string} player - The current player.
 * @returns {number|null} - The index of the best move, or null if no move found.
 */
export default function calcBestMove(squares, player) {
  /**
   * Counts the number of occurrences of the player's value in an array.
   * 
   * @param {Array} arr - The array to count occurrences in.
   * @returns {number} - The number of occurrences.
   */
  const getArrDuplicatedCount = (arr) => {
    let count = 0;
    arr.forEach((i) => {
      if (squares[i] === player) {
        count += 1;
      }
    });
    return count;
  };

  // Sort the lines based on the number of occurrences of the player's value
  const sortedLines = lines.sort((a, b) => {
    let acount = getArrDuplicatedCount(a);
    let bcount = getArrDuplicatedCount(b);
    return bcount - acount;
  });

  // Iterate over the sorted lines and find the first empty square
  for (let i = 0; i < sortedLines.length; i++) {
    let val = sortedLines[i].find((el) => {
      if (squares[el] === "") {
        return el + "";
      }
      return null;
    });

    // If an empty square is found, return its index
    if (!val) {
      continue;
    }
    return +val;
  }

  // If no empty square is found, return null
  return null;
}
