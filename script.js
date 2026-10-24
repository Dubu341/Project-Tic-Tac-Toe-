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

const computerInput = function () {
  const randomNumber = Math.floor(Math.random() * 9) + 1;
  if (
    !player1.getTile().includes(randomNumber) &&
    !comp.getTile().includes(randomNumber)
  ) {
    return comp.selectTile(randomNumber);
  } else {
    return computerInput();
  }
};
