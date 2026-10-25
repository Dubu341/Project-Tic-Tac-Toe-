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
    console.log("Player Won");
  }
};
const computerWon = function () {
  if (comp.checkWinner() === true) {
    comp.giveScore();
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
    !player.getTile().includes(input) &&
    !comp.getTile().includes(input) &&
    gameEnd() === false
  ) {
    return (
      player.selectTile(input),
      console.log(player.getTile()),
      (gameBoard[input] = player1.marker),
      playerWon()
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

const player1 = new Player("Player ", "X");
const player2 = new Player("Computer", "O");
