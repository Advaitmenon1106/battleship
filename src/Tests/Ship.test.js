import { Ship } from "../Ship";
import { isSunk } from "../Ship";

test("An n-length ship is recognised as sunk when hit n times", () => {
  expect(isSunk(new Ship(4, 4))).toBeTruthy();
});

test("An n-length ship is recognised as sunk when hit n-k times", () => {
  expect(isSunk(new Ship(4, 2))).toBeFalsy();
});
