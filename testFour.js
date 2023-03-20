let xspacing = 8;
let w;
let theta = 0.0;
let amplitude = -100.0;
let period = -1500.0;
let dx;
let yvalues;
let char = ['', '.', '-', '+', 'G', '▓', '█'];
let thetachange;

function draw_one_frame() {
  fill(30);
  rect(0, 0, width+1, height+1);
    
  w = width/2;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  calcWave();
  renderWave();
}

function calcWave() {
  theta += 0.05;  //0.26
  thetachange = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(thetachange) * amplitude;
    thetachange += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  textSize(width/200);
  for (let x = -30 ; x < yvalues.length; x++) {
    for (let j = 0; j < 30; j++) {
      let z = (x+30);
      let g = (x+30)-yvalues.length;
      if(yvalues[(j)+(z)] % 100 < -10 || yvalues[(j)+(g)] % -100 > 10){  
        text(char[1], x * xspacing + width/2.5, height / 2 + yvalues[x+j], 16, 16);
      } else {
        text(char[4], x * xspacing + width/2.5, height / 2 + yvalues[x+j], 16, 16);
      }
    }
  }
}