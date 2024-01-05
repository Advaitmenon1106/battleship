import { Gameboard } from "./GameMaster";

function coordInArray(arr, coord) {
  arr.forEach((c) => {
    if (JSON.stringify(c) === JSON.stringify(coord)) {
      return true;
    }
  });
  return false;
}

export class AI {
  constructor() {
    this.aiGameboard = [];
    this.moveStack = [];
    this.gameBoard = new Gameboard();

    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0);
      }
      this.aiGameboard.push(row);
    }
  }

  makeAMove(oppGameboardObj) {
    let move;
    while (
      oppGameboardObj.gameboardMatrix[move[0][move[1]]] != 0 &&
      coordInArray(this.moveStack, move) == true &&
      !oppGameboardObj.allShipsSunk()
    ) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      move = [x, y];
    }
    this.moveStack.push(move);
    oppGameboardObj.landHit(move);
  }
}
