export function outOfBounds(coord, len, orientation) {
  if (orientation == "horizontal") {
    const y = coord[1];
    if (y + len - 1 > 9) {
      return true;
    }
    return false;
  } else if (orientation == "vertical") {
    const x = coord[0];
    if (x + len - 1 > 9) {
      return true;
    }
    return false;
  }
}

export class Gameboard {
  constructor(ships) {
    this.ships = ships;
    this.gameboardMatrix = [];

    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0);
      }
      this.gameboardMatrix.push(row);
    }
  }

  placeShip(shipObj, coord, orientation) {
    if (!outOfBounds(coord, shipObj.len, orientation)) {
      const row = coord[0];
      const col = coord[1];
      if (orientation === "vertical") {
        for (let i = 0; i < shipObj.len; i++) {
          shipObj.occupiedSpaces.push([row+i, col]);
        }
      } else if (orientation === "horizontal") {
        for (let i = 0; i < shipObj.len; i++) {
          shipObj.occupiedSpaces.push([row, col+i]);
        }
      }
    } else {
      return;
    }
  }

  receiveHits(coord) {
    let target = gameboardMatrix[coord[0]][coord[1]];
    if (target == 1) {
      target = target + 1;
    }
  }
}
