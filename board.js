const X_PLAYER = "x";
const CIRCLE_PLAYER = "circle";
const restartBtn = document.querySelector("#restart");
const current_turn = document.querySelector(".current-turn");

let draw;

const displayWinnerBackground = document.querySelector(
  "#winning_message_background"
);
const winnerMessage = document.querySelector(".winner-message");
const nextRound = document.querySelector("#next-round");
current_turn.style.backgroundImage = 'url("/assets/icon-x.svg")';
let circleTurn;
let currentPlayer;
let remainingSquares = 9;

const gameBoard = document.querySelector("#board");
const startCells = ["", "", "", "", "", "", "", "", ""];
function createBoard() {
  remainingSquares = 8;
  gameBoard.innerHTML = "";
  displayWinnerBackground.classList.remove("show");
  circleTurn = false;
  current_turn.style.backgroundImage = 'url("/assets/icon-x.svg")';
  startCells.forEach((_cell, idx) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = idx;
    cellElement.addEventListener("click", selectBoard);
    gameBoard.append(cellElement);
  });
}
createBoard();

function selectBoard(e, currentPlayer) {
  currentPlayer = circleTurn ? CIRCLE_PLAYER : X_PLAYER;
  console.log(currentPlayer);
  const displayPlayer = document.createElement("div");
  displayPlayer.classList.add(currentPlayer);
  e.target.append(displayPlayer);
  e.target.removeEventListener("click", selectBoard);
  if (checkWin(e, currentPlayer)) {
  }
  swapTurns();
  remainingSquares--;
  console.log(remainingSquares);
}

function swapTurns() {
  circleTurn = !circleTurn;
  current_turn.style.backgroundImage = circleTurn
    ? 'url("/assets/icon-o.svg")'
    : 'url("/assets/icon-x.svg")';
}
function checkWin(e, currentPlayer) {
  const you_score = document.querySelector("#you-score");
  const cpu_score = document.querySelector("#cpu-score");
  const ties_score = document.querySelector("#ties-score");

  if (remainingSquares === 0) {
    console.log("found draw");
    ties_score.innerText++;
    displayWin(currentPlayer);
    return;
  } else {
    console.log("checking board for winners...");
    const allSquares = document.querySelectorAll(".square");
    let WINNING_CHECK = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    WINNING_CHECK.forEach((array) => {
      const foundWinner = array.every((cell) =>
        allSquares[cell].firstChild?.classList.contains(currentPlayer)
      );

      if (foundWinner) {
        console.log("found winner: ");
        displayWin(currentPlayer);
        allSquares.forEach((square) =>
          square.replaceWith(square.cloneNode(true))
        );
        currentPlayer === X_PLAYER
          ? you_score.innerText++
          : cpu_score.innerText++;
        return;
      }
    });
  }
}

nextRound.addEventListener("click", createBoard);

function displayWin(currentPlayer) {
  if (remainingSquares === 0) {
    winnerMessage.innerText = `Tie!`;
  } else {
    winnerMessage.innerText = `${currentPlayer} Wins!`;
  }

  displayWinnerBackground.classList.add("show");
}

function restart() {
  location.reload();
}

restartBtn.addEventListener("click", restart);
