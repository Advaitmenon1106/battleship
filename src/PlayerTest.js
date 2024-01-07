import { Gameboard } from "./logic/GameMaster";
import { AI } from "./logic/Player";

export function gameLoopTest() {
  const ai = new AI();
  const playerGameboard = new Gameboard();

  ai.makeAMove(playerGameboard);
  ai.makeAMove(playerGameboard);
  ai.makeAMove(playerGameboard);
}
