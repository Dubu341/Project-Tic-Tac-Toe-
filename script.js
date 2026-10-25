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
  if (player.checkWinner() === true) {
    player.giveScore();
    updateScore();
    console.log("Player Won");
  }
};
const computerWon = function () {
  if (comp.checkWinner() === true) {
    comp.giveScore();
    updateScore();
    console.log("Computer Won");
  }
};

const tieCheck = function () {
  if (player.getTile().length + comp.getTile().length === 9) {
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
  return (player.resetState(), comp.resetState());
};

const computerInput = function () {
  const randomNumber = Math.floor(Math.random() * 9);
  if (
    !player.getTile().includes(randomNumber) &&
    !comp.getTile().includes(randomNumber) &&
    gameEnd() === false
  ) {
    return (
      comp.selectTile(randomNumber),
      console.log(comp.getTile()),
      (gameBoard[randomNumber] = player2.marker),
      computerWon()
    );
  } else if (gameEnd() === true) {
    console.log("game ended");
  } else if (tieCheck() === true) {
    console.log("Tie!");
  } else {
    return computerInput();
  }
};

const playerInput = function (input) {
  if (
    !player.getTile().includes(+input) && //+ to turn id string to number
    !comp.getTile().includes(+input) &&
    gameEnd() === false
  ) {
    return (
      player.selectTile(+input),
      console.log(player.getTile()),
      (gameBoard[+input] = player1.marker),
      playerWon(),
      computerInput()
    );
  } else if (gameEnd() === true) {
    console.log("game ended");
  } else if (tieCheck() === true) {
    console.log("Tie!");
  } else {
    return console.log("Tile already taken");
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

let player1 = new Player("Player", "X");
const player2 = new Player("Computer", "O");

const container = document.querySelectorAll(".boardContainer div");
const playerScore = document.querySelector(".playerScore");
const computerScore = document.querySelector(".computerScore");

const display = (() => {
  container.forEach((div) => {
    div.addEventListener("click", () => {
      if (div.textContent === "") {
        playerInput(div.id);
        updateDisplay();
      }
    });
  });
})();

const updateDisplay = () => {
  gameBoard.forEach((item, index) => {
    const div = document.getElementById(String(index));
    div.textContent = item;
  });
};
const updateScore = () => {
  playerScore.textContent = `Player: ${player.getScore()}`;
  computerScore.textContent = `Computer: ${comp.getScore()}`;
};








// works but i dont want it included
// const submitBtn = document.querySelector(".submitBtn");
// submitBtn.addEventListener("click", () => {
//   const playerName = document.querySelector("#name").value;
//   return (player1 = new Player(playerName, "X"));
// });
