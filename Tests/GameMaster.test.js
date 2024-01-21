import { Gameboard, outOfBounds } from "../src/logic/GameMaster";
import { Ship } from "../src/logic/Ship";
import { overlap } from "../src/logic/GameMaster";

const jsfy = JSON.stringify;

test("The function outOfBounds detects the boundaries of the gameboard", () => {
  expect(outOfBounds([0, 5], 5, "horizontal")).toBeFalsy();
  expect(outOfBounds([2, 6], 5, "horizontal")).toBeTruthy();
  expect(outOfBounds([9, 5], 5, "vertical")).toBeTruthy();
  expect(outOfBounds([9, 6], 5, "vertical")).toBeTruthy();
  expect(outOfBounds([9, 9], 1, "horizontal")).toBeFalsy();
  expect(outOfBounds([9, 9], 2, "horizontal")).toBeTruthy();
});

test('The gameboard/"GameMaster" places a ship correctly', () => {
  const newShip = new Ship(5, 0);
  const anotherNewShip = new Ship(5, 0);
  const yetAnotherShip = new Ship(3, 0);
  const gb = new Gameboard();

  gb.placeShip(newShip, [1, 0], "horizontal");
  gb.placeShip(anotherNewShip, [0, 6], "horizontal");
  gb.placeShip(yetAnotherShip, [1, 2], "vertical");

  expect(jsfy(newShip.occupiedSpaces)).toBe(
    jsfy([
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ]),
  );

  expect(jsfy(yetAnotherShip.occupiedSpaces)).toBe(
    jsfy([]),
  );

  expect(jsfy(anotherNewShip.occupiedSpaces)).toBe("[]");
});

test("landHits functions as expected, logically, and the function registers a hit", () => {
  const gb = new Gameboard();
  const newShip = gb.shipList[9];

  gb.placeShip(newShip, [1, 0], "horizontal");
  gb.landHit([1, 2]);
  expect(gb.gameboardMatrix[1][2]).toBe(-1);
  expect(newShip.hits).toBe(1);
});

test("landHits does not indicate a hit falsely on the gameboard", () => {
  const gb = new Gameboard();
  const newShip = gb.shipList[9];

  gb.placeShip(newShip, [1, 0], "horizontal");
  gb.landHit([2, 2]);
  expect(gb.gameboardMatrix[2][2]).toBe(0.5);
  expect(newShip.hits).toBe(0);
});

test("The gameboard correctly determines if all ships are sunk", () => {
  const gb = new Gameboard();
  expect(gb.allShipsSunk()).toBeFalsy();

  gb.shipList.forEach((shipObj) => {
    shipObj.hits = shipObj.len;
  });

  expect(gb.allShipsSunk()).toBeTruthy();
});

test("Overlap correctly determines which grids are problematic", () => {
  const gb = new Gameboard();
  const Ship1 = gb.shipList[9];
  const Ship2 = gb.shipList[9];

  gb.placeShip(Ship1, [1, 5], "horizontal");
  expect(overlap(gb.gameboardMatrix, [1, 3], Ship2.len, "horizontal")).toBeTruthy();
  expect(overlap(gb.gameboardMatrix, [1, 7], Ship2.len, "horizontal")).toBeTruthy();
});
