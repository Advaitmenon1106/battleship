import { Ship } from "../Ship";
import { isSunk } from "../Ship";

test("Is an n-length ship being recognised as sunk when hit n times?", () => {
  expect(isSunk(new Ship(4, 4))).toBeTruthy();
});

test("Is an n-length ship being recognised as sunk when hit n-k times?", () => {
  expect(isSunk(new Ship(4, 2))).toBeFalsy();
});
