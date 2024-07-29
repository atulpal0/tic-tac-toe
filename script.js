let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameBoard = document.getElementById("gameBoard");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");

function handleCellClick(event) {
  const cellIndex = event.target.getAttribute("data-index");

  if (board[cellIndex] !== "" || !gameActive) {
    return;
  }

  updateCell(event.target, cellIndex);
  checkResult();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.innerText = currentPlayer;
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    message.innerText = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  let roundDraw = !board.includes("");
  if (roundDraw) {
    message.innerText = "Game ended in a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.innerText = `It's ${currentPlayer}'s turn`;
}

function handleReset() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  cells.forEach((cell) => (cell.innerText = ""));
  message.innerText = `It's ${currentPlayer}'s turn`;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", handleReset);

message.innerText = `It's ${currentPlayer}'s turn`;
