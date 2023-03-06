let charSize = 12;
let gridWidth = 60;
let gridHeight = 40;
let grid = [];

function draw_one_frame() {
  background(0);
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      textSize(charSize);
      textAlign(CENTER, CENTER);
      fill(255);
      text(grid[y][x], x * charSize + charSize / 2, y * charSize + charSize / 2);
    }
  }
}

function getRandomChar() {
  let chars = ["@", "#", "%", "*", "+", "=", "-", ".", ":", "/", "^", "~"];
  return chars[Math.floor(Math.random() * chars.length)];
}