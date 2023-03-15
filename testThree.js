let xspacing = 8;
let w;
let theta = 0.0;
let amplitude = 125.0;
let period = -1000.0;
let dx;
let yvalues;
let char = ['', '.', '-', '+', '%', '▓', '█'];
let thetachange;

function draw_one_frame() {
fill(30);
rect(0, 0, width+1, height+1);
    
    w = width + 302;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
    calcWave();
    renderWave();
}

function calcWave() {
    theta += 0.01;
    let thetachange = theta;
    for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(thetachange) * amplitude;
    thetachange += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  for (let x = 0; x < yvalues.length; x++) {
    for (let j = 0; j < 30; j++) {
      if(yvalues > (PI/2-thetachange) || yvalues < (3*PI/2-thetachange)){
        text(char[4], x * xspacing, height / 2 + yvalues[x+j], 16, 16);
        }else{
        text(char[1], x * xspacing, height / 2 + yvalues[x+j], 16, 16);
        }
    }
  }
}