const squareSize = 3;
const sudokuSize = squareSize * squareSize;
const emptyFieldChar = "";

/**
 * Solve a sudoku according to the classic sudoku rules.
 *
 * @param {character[][]} board
 * @returns {boolean} Modify board in-place and return if the puzzle is solved.
 */
function solveSudoku(board) {
  return dfs(board);
}

/**
 * Depth first search algo approach to solve a sudoku puzzle.
 *
 * @param {character[][]} board
 * @returns {boolean} Modify board in-place and return if the puzzle is solved.
 */
function dfs(board) {
  for (let x = 0; x < sudokuSize; x++) {
    for (let y = 0; y < sudokuSize; y++) {
      if (board[y][x] === emptyFieldChar) {
        for (let guess = 1; guess <= sudokuSize; guess++) {
          // make a guess
          board[y][x] = guess + "";
          // check if guess was correct, if so continue.
          if (isValid(board, x, y) && dfs(board)) {
            return true;
          }
          // guess wasn't correct
          board[y][x] = emptyFieldChar;
        }
        // no guesses are correct, backtrack
        return false;
      }
    }
  }
  return true;
}

/**
 *
 * @param {character[][]} board
 * @param {number} x
 * @param {number} y
 * @returns {boolean} Whether the given square is valid, given the rest of the sudoku.
 */
function isValid(board, x, y) {
  for (let k = 0; k < sudokuSize; k++) {
    // Row contains the number already
    if (k !== x && board[y][x] === board[y][k]) return false;
    // Column contains the number already
    if (k !== y && board[y][x] === board[k][x]) return false;
    const xk = Math.floor(x / squareSize) * squareSize + (k % squareSize);
    const yk = Math.floor(y / squareSize) * squareSize + Math.floor(k / squareSize);
    if (!(xk === x && yk === y) && board[y][x] === board[yk][xk]) return false;
  }
  return true;
}

export { solveSudoku };
