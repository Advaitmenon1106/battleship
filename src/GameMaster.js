import { Ship } from "./Ship";

export function outOfBounds(coord, len, orientation) {
  if (orientation == "horizontal") {
    const y = coord[1];
    if (y + len - 1 > 9) {
      return true;
    }
    return false;
  } else if (orientation === "vertical") {
    const x = coord[0];
    if (x + len - 1 > 9) {
      return true;
    }
    return false;
  }
}

export class Gameboard {
  constructor() {
    this.gameboardMatrix = [];
    this.shipList = [];

    const destroyer1 = new Ship(2, 0, "Destroyer1");
    const destroyer2 = new Ship(2, 0, "Destroyer2");
    const cruiser1 = new Ship(3, 0, "Cruiser1");
    const cruiser2 = new Ship(3, 0, "Cruiser2");
    const submarine1 = new Ship(3, 0, "Submarine1");
    const submarine2 = new Ship(3, 0, "Submarine2");
    const battleship1 = new Ship(4, 0, "Battleship1");
    const battleship2 = new Ship(4, 0, "Battleship2");
    const carrier1 = new Ship(5, 0, "Carrier1");
    const carrier2 = new Ship(5, 0, "Carrier2");

    this.shipList.push(
      destroyer1,
      destroyer2,
      cruiser1,
      cruiser2,
      submarine1,
      submarine2,
      battleship1,
      battleship2,
      carrier1,
      carrier2,
    );

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
          shipObj.occupiedSpaces.push([row + i, col]);
          this.gameboardMatrix[row + i][col] = 1;
        }
      } else if (orientation === "horizontal") {
        for (let i = 0; i < shipObj.len; i++) {
          shipObj.occupiedSpaces.push([row, col + i]);
          this.gameboardMatrix[row][col + i] = 1;
        }
      }
    } else {
      return;
    }
  }

  landHit(coord) {
    if (this.gameboardMatrix[coord[0]][coord[1]] === 1) {
      this.gameboardMatrix[coord[0]][coord[1]] = -1;

      this.shipList.forEach((shipObj) => {
        shipObj.occupiedSpaces.forEach((space) => {
          if (JSON.stringify(space) === JSON.stringify(coord)) {
            shipObj.hits = shipObj.hits + 1;
          }
        });
      });
    }
    else{
      this.gameboardMatrix[coord[0]][coord[1]] = 0.5;
    }
  }
}
