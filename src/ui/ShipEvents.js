import { outOfBounds, overlap, shipExists } from "../logic/GameMaster";

export function displayAvailablePositions(
  event,
  shipObj,
  gameboardObj,
  orientation,
) {
  const id = Number(event.target.id);
  const x = Math.floor(id / 10);
  const y = id % 10;
  const coord = [x, y];
  const length = shipObj.len;

  if (
    outOfBounds(coord, length, orientation) &&
    !shipExists(gameboardObj, coord)
  ) {
    if (orientation === "horizontal") {
      for (let i = id; i < Math.ceil(id / 10) * 10; i++) {
        document
          .getElementById(String(i))
          .setAttribute("style", "background-color: red");
      }
    } else if (orientation === "vertical") {
      for (let i = x; i < 10; i++) {
        document
          .getElementById(String(10 * i + y))
          .setAttribute("style", "background-color: red");
      }
    }

    // do something for vertical
  } else {
    if (overlap(gameboardObj.gameboardMatrix, coord, length, orientation)) {
      return;
    }

    if (orientation === "horizontal") {
      for (let i = id; i < id + length; i++) {
        document
          .getElementById(String(i))
          .setAttribute("style", "background-color: silver");
      }
    } else if (orientation === "vertical") {
      for (let i = x; i < x + length; i++) {
        document
          .getElementById(String((10 * i) + y))
          .setAttribute("style", "background-color: silver");
      }
    }
  }
}

export function hoverColourFade(event, gameboardObj, length, orientation) {
  const id = Number(event.target.id);
  const x = Math.floor(id / 10);
  const y = id % 10;
  const coord = [x, y];

  // do something so that it checks for overlaps right here

  if (overlap(gameboardObj.gameboardMatrix, coord, length, orientation)) {
    return;
  } else {
    if (orientation === "horizontal") {
      for (let i = id; i < id + length; i++) {
        const currentCoord = [Math.floor(i / 10), i % 10];
        if (shipExists(gameboardObj, currentCoord)) {
          return;
        }
        const currentGrid = document.getElementById(String(i));
        currentGrid.setAttribute("style", "background-color: none");
        // console.log(i);
      }
    } else if (orientation === "vertical") {
      for (let i = x; i < x + length; i++) {
        const currentCoord = [i, y];
        console.log(currentCoord);
        if (shipExists(gameboardObj, currentCoord)) {
          return;
        }
        console.log((10 * i) + y);
        const currentGrid = document.getElementById(String(10 * i + y));
        currentGrid.setAttribute("style", "background-color: none");
      }
    }
  }
}

export function placeShip(event, gameboardObj, shipObj, orientation) {
  const gameboardMatrix = gameboardObj.gameboardMatrix;
  const len = shipObj.len;
  const id = Number(event.target.id);
  const x = Math.floor(id / 10);
  const y = id % 10;
  const coord = [x, y];
  // orientation = "horizontal";

  if (
    overlap(gameboardMatrix, coord, len, orientation) ||
    outOfBounds(coord, len, orientation)
  ) {
    return;
  } else {
    if (orientation === "horizontal") {
      for (let i = id; i < id + shipObj.len; i++) {
        const currentGrid = document.getElementById(String(i));
        currentGrid.setAttribute("style", "background-color: black");
      }
    } else if (orientation === "vertical") {
      for (let i = x; i < x + shipObj.len; i++) {
        const currentGrid = document.getElementById(String(10 * i + y));
        currentGrid.setAttribute("style", "background-color: black");
      }
    }
    gameboardObj.placeShip(shipObj, coord, orientation);
    console.table(gameboardObj.gameboardMatrix);
  }
}
