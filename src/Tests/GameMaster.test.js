import { Gameboard, outOfBounds } from "../GameMaster";
import { Ship } from "../Ship";

const jsfy = JSON.stringify;

test("The function outOfBounds detects the boundaries of the gameboard", () => {
  expect(outOfBounds([0, 5], 5, "horizontal")).toBeFalsy();
  expect(outOfBounds([2, 6], 5, "horizontal")).toBeTruthy();
  expect(outOfBounds([9, 5], 5, "vertical")).toBeTruthy();
  expect(outOfBounds([9, 6], 5, "vertical")).toBeTruthy();
  expect(outOfBounds([9, 9], 1, "horizontal")).toBeFalsy();
  expect(outOfBounds([9, 9], 2, "horizontal")).toBeTruthy();
});

test("The gameboard/\"GameMaster\" places a ship correctly", () => {
  const newShip = new Ship(5, 0);
  const anotherNewShip = new Ship(5, 0);
  const yetAnotherShip = new Ship(3, 0);
  const gb = new Gameboard(5);

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
    jsfy([
      [1, 2],
      [2, 2],
      [3, 2],
    ]),
  );

  expect(jsfy(anotherNewShip.occupiedSpaces)).toBe("[]");
});
