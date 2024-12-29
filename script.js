document.addEventListener('DOMContentLoaded', function () {
  const cells = document.querySelectorAll('.cell');
  const resetBtn = document.getElementById('resetBtn');
  const startBtn = document.getElementById('startBtn');
  const message = document.getElementById('message');
  const board = document.querySelector('.board');
  let currentPlayer = 'X';
  let gameActive = false;

  // Handle player turn and cell click
  function handleCellClick(event) {
    const cell = event.target;

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    checkWinner();
    switchPlayer();
  }

  // Check for a winner
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
        gameActive = false;
        message.textContent = `${currentPlayer} wins!`;
        return;
      }
    }

    // Check for a tie
    if (Array.from(cells).every(cell => cell.textContent !== '')) {
      gameActive = false;
      message.textContent = 'It\'s a tie!';
    }
  }

  // Switch player turn
  function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  // Reset the game
  function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = false;
    message.textContent = '';
  }

  // Start the game
  function startGame() {
    board.style.display = 'grid';    // Show the board
    resetBtn.style.display = 'inline-block'; // Show the reset button
    startBtn.style.display = 'none'; // Hide the start button
    gameActive = true;
    message.textContent = '';
  }

  // Attach event listeners to each cell
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));

  // Attach event listener to reset button
  resetBtn.addEventListener('click', resetGame);

  // Attach event listener to start button
  startBtn.addEventListener('click', startGame);
});
