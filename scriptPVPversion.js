const ticTacToe = function () {
  const tiles = [];
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let score = 0;
  return {
    selectTile(tile) {
      if (typeof tile === "number" && !tiles.includes(tile)) {
        tiles.push(tile);
      }
      return tiles;
    },
    getTile() {
      return [...tiles];
    },
    checkWinner() {
      return winCondition.some((combination) => {
        return combination.every((index) => tiles.includes(index));
      });
    },
    resetState() {
      return (tiles.length = 0);
    },
    getScore() {
      return score;
    },
    giveScore() {
      score++;
    },
  };
};

const comp = ticTacToe();
const player = ticTacToe();

const playerWon = function () {
  const tracker = tileTrackers[currentPlayer];
  if (tracker.checkWinner() === true) {
    tracker.giveScore();
    updateScore();
    layout.appendChild(winnerDisplay);
    winnerDisplay.textContent = `${participants[currentPlayer].name} WON!`;
  }
};

const tieCheck = function () {
  if (player.getTile().length + comp.getTile().length === 9) {
    winnerDisplay.textContent = "TIE!";
    layout.appendChild(winnerDisplay);
    return true;
  } else {
    return false;
  }
};

const gameEnd = function () {
  if (comp.checkWinner() === true || player.checkWinner() === true) {
    return true;
  } else {
    return false;
  }
};

const gameReset = function () {
  player.resetState();
  comp.resetState();
  gameBoard.length = 0;
  currentPlayer = 0;
  clearDisplay();
  winnerDisplay.remove();
};

// const computerInput = function () {
//   const randomNumber = Math.floor(Math.random() * 9);
//   if (
//     !player.getTile().includes(randomNumber) &&
//     !comp.getTile().includes(randomNumber) &&
//     gameEnd() === false
//   ) {
//     return (
//       comp.selectTile(randomNumber),
//       console.log(comp.getTile()),
//       (gameBoard[randomNumber] = player2.marker),
//       computerWon()
//     );
//   } else if (gameEnd() === true) {
//     console.log("game ended");
//   } else if (tieCheck() === true) {
//     console.log("Tie!");
//   } else {
//     return computerInput();
//   }
// };

const playerInput = function (input) {
  const tile = +input; //+ to turn string from html id to number
  if (
    !player.getTile().includes(tile) &&
    !comp.getTile().includes(tile) &&
    gameEnd() === false
  ) {
    tileTrackers[currentPlayer].selectTile(tile);
    gameBoard[tile] = participants[currentPlayer].marker;
    playerWon();
    if (!gameEnd() && !tieCheck()) {
      advancePlayer();
    }
  } else if (gameEnd() === true) {
    console.log("game ended");
  } else {
    console.log("Tile already taken");
  }
};

let gameBoard = [];
function Player(name, marker) {
  if (!new.target) {
    throw Error("user new");
  }
  this.name = name;
  this.marker = marker;
}

let player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

const tileTrackers = [player, comp];
const participants = [player1, player2];
let currentPlayer = 0;

function advancePlayer() {
  currentPlayer = (currentPlayer + 1) % 2;
}

const layout = document.querySelector(".layout");
const cells = document.querySelectorAll(".cell");
const playerScore = document.querySelector(".playerScore");
const computerScore = document.querySelector(".computerScore");
const winnerDisplay = document.createElement("span");
const restartGameBtn = document.querySelector(".restartGame");
winnerDisplay.classList.add("winnerDisplay");

const display = (() => {
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.textContent === "") {
        playerInput(cell.id);
        updateDisplay();
      }
    });
  });
})();

const clearDisplay = function () {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
};

const updateDisplay = () => {
  gameBoard.forEach((item, index) => {
    const div = document.getElementById(String(index));
    div.textContent = item;
  });
};

const updateScore = () => {
  playerScore.textContent = `Player 1: ${player.getScore()}`;
  computerScore.textContent = `Player 2: ${comp.getScore()}`;
};

restartGameBtn.addEventListener("click", () => {
  gameReset();
});
