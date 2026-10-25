const ticTacToe = function () {
  const tiles = [];
  const winCondition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 4, 8],
    [3, 5, 7],
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
const player1 = ticTacToe();

const playerWon = function () {
  if (player1.checkWinner() === true) {
    player1.giveScore();
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
  if (player1.getTile().length + comp.getTile().length === 9) {
    return true;
  } else {
    false;
  }
};

const gameEnd = function () {
  if (comp.checkWinner() === true || player1.checkWinner() === true) {
    return true;
  } else {
    return false;
  }
};

const gameReset = function () {
  return (player1.resetState(), comp.resetState());
};

const computerInput = function () {
  const randomNumber = Math.floor(Math.random() * 9) + 1;
  if (
    !player1.getTile().includes(randomNumber) &&
    !comp.getTile().includes(randomNumber) &&
    gameEnd() === false
  ) {
    return (
      comp.selectTile(randomNumber),
      console.log(comp.getTile()),
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
    !player1.getTile().includes(input) &&
    !comp.getTile().includes(input) &&
    gameEnd() === false
  ) {
    return (
      player1.selectTile(input),
      console.log(player1.getTile()),
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
