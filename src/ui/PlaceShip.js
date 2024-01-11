import { outOfBounds } from "../logic/GameMaster";

export function overlappingUI(id, dim, len, orientation) {
  if (orientation === "horizontal") {
    for (let i = id; i < id + len; i++) {
      if (
        document.getElementById(String(i)).style.backgroundColor === "black"
      ) {
        console.log("at id: " + i);
        return true;
      }
    }
    return false;
  } else if (orientation === "vertical") {
    let idIter = id;
    for (let i = 0; i < len; i++) {
      if (
        document.getElementById(String(idIter)).style.backgroundColor ===
        "black"
      ) {
        return true;
      }
      idIter = idIter + dim;
    }
    return false;
  }
}

export function shipEvents(shipObj) {
  const grids = document.getElementsByClassName("grid-boxes");
  const orientation = document.getElementById("orientation");

  const resetCol = (event) => resetColours(event);
  const mouseOverFn = (event) =>
    displayAvailablePositions(
      event,
      shipObj,
      orientation.innerHTML.toLowerCase(),
    );

  for (let i = 0; i < grids.length; i++) {
    grids[i].addEventListener("mouseover", mouseOverFn);
    grids[i].addEventListener("click", (event) =>
      placeShip(event, shipObj, resetCol, mouseOverFn),
    );
    grids[i].addEventListener("mouseleave", resetCol);
  }
}

function displayAvailablePositions(event, shipObj, orientation) {
  const id = Number(event.target.id);
  const x = Math.floor(id / 10);
  let y = (id % 10) - 1;
  if (y == -1) {
    y = 9;
  }
  const coord = [x, y];

  if (outOfBounds(coord, shipObj.len, orientation)) {
    if (orientation === "horizontal") {
      for (let i = id; i <= Math.ceil(id / 10) * 10; i++) {
        // console.log(i);
        document
          .getElementById(String(i))
          .setAttribute("style", "background-color: red");
      }
    }
  } else {
    if (overlappingUI(id, 10, shipObj.len, orientation)) {
      return;
    }
    for (let i = id; i < id + shipObj.len; i++) {
      document
        .getElementById(String(i))
        .setAttribute("style", "background-color: silver");
    }
  }
}

function resetColours(event) {
  const id = event.target.id;
  for (let i = id; i <= Math.ceil(id / 10) * 10; i++) {
    document
      .getElementById(String(i))
      .setAttribute("style", "background-color: none");
  }
}

function placeShip(event, shipObj, resetFn, mouseOverFn) {
  if (event.target.style.backgroundColor === "red") {
    return;
  } else {
    const id = Number(event.target.id);
    for (let i = id; i < id + shipObj.len; i++) {
      const currentGrid = document.getElementById(String(i));
      currentGrid.setAttribute("style", "background-color: black");
      currentGrid.removeEventListener("mouseleave", resetFn);
      currentGrid.removeEventListener("mouseover", mouseOverFn);
      console.log(i);
    }
  }
}

// function removeClickEvent(id, shipObj, clickEvent){
//   for (let i = id; i < id + shipObj.len; i++) {
//     document.getElementById(String(i)).removeEventListener(clickEvent);
//   }
// }
