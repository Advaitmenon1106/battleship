export class Ship {
  constructor(len, hits, name) {
    this.len = len;
    this.hits = hits;
    this.name = name
    this.occupiedSpaces = [];

    function hit() {
      hits = hits + 1;
    }
  }
}

export function isSunk(shipObj) {
  if (shipObj.hits === shipObj.len) {
    return true;
  }
  return false;
}
