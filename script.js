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
  };
};

const comp = ticTacToe();
const player1 = ticTacToe();

const playerWon = function () {
  if (player1.checkWinner() === true) {
    console.log("Player Won");
  }
};
const computerWon = function () {
  if (comp.checkWinner() === true) {
    console.log("Computer Won");
  }
};

const computerInput = function () {
  const randomNumber = Math.floor(Math.random() * 9) + 1;
  if (
    !player1.getTile().includes(randomNumber) &&
    !comp.getTile().includes(randomNumber) &&
    comp.checkWinner() === false &&
    player1.checkWinner() === false
  ) {
    return (
      comp.selectTile(randomNumber),
      console.log(comp.getTile()),
      computerWon()
    );
  } else {
    return computerInput(); //loops infinite till it gives an error
  }
};

const playerInput = function (input) {
  if (
    !player1.getTile().includes(input) &&
    !comp.getTile().includes(input) &&
    comp.checkWinner() === false &&
    player1.checkWinner() === false
  ) {
    return (
      player1.selectTile(input),
      console.log(player1.getTile()),
      playerWon()
    );
  } else {
    return console.log("Tile already taken or game over");
  }
};
