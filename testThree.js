let xspacing = 8;
let w;
let theta = 0.0;
let amplitude = 100.0;
let period = -1500.0;
let dx;
let yvalues;
let char = ['', '.', '-', '+', '%', '▓', '█'];
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
  theta += 0.26;
  thetachange = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(thetachange) * amplitude;
    thetachange += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  textSize(width/100);
  for (let x = -100 ; x < yvalues.length; x++) {
    for (let j = 0; j < 30; j++) {
      if((j * yvalues[x+j]) % 100 > 50 || (-j * yvalues[x+j]) % 100 > 50){
        text(char[0], x * xspacing + width/2.5, height / 2 + yvalues[x+j], 16, 16);
        }else{
        text(char[4], x * xspacing + width/2.5, height / 2 + yvalues[x+j], 16, 16);
        }
    }
  }
}