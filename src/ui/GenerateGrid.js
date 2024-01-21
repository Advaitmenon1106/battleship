import { Gameboard } from "../logic/GameMaster";
import { Ship } from "../logic/Ship";
import { displayAvailablePositions, hoverColourFade, placeShip } from "./ShipEvents";

export default function generateGrid() {
  const gridOutline = document.createElement("div");
  const gameboard = new Gameboard();
  const ship = new Ship(5, 0, "Battleship");
  gridOutline.id = "grid-outline";
  const orientation = document.getElementById("orientation").innerHTML;

  document.body.appendChild(gridOutline);

  for (let i = 0; i < 100; i++) {
    const box = document.createElement("div");
    box.className = "grid-boxes";
    gridOutline.appendChild(box);
    box.id = String(i);
    
    box.addEventListener("mouseover", (event)=>displayAvailablePositions(event, ship, gameboard, orientation.toLowerCase()));
    box.addEventListener("mouseleave", (event)=>hoverColourFade(event, gameboard, ship.len, orientation));
    box.addEventListener("click", (event)=>placeShip(event, gameboard, ship, orientation));
  }
  
}

/* 
To-do:-

1. Make <some functions> that take in gameboard and a shipObj as a parameter
2. These functions will be used for the event listeners applied on each grid
3. Comparisions will be made by superimposing the grid and the respective gameboard, and not by only using the AI, as done previously

*/