let xspacing;
let w;
let theta = 0.0;
let thetachange;
let amplitude;
let period;
let dx;
let yvalues;
let char = ['f', 'Q'];

function draw_one_frame() {
  fill('#887ecb');
  noStroke();
  rect(0, 0, width, height);
  
  fill('#50459b');
  noStroke();
  rect(width/15, height/10, width/1.159, height/1.27);
  
  amplitude = height/4.5;
  period = -height*1.05;
  xspacing = width/200;
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
  fill('#887ecb');
  textFont('Courier New');
  textSize(width/132);
  for (let x = -40 ; x < yvalues.length; x++) {
    for (let j = 0; j < 40; j++) {
      if((j * yvalues[x+j]) % 100 > 50 || (-j * yvalues[x+j]) % 100 > 50){
        text(char[0], x * xspacing + width/2.92, ((height / 1.9) - j) + yvalues[x+j], 16, 16);
        }else{
        text(char[1], x * xspacing + width/2.9, ((height / 1.91) - j) + yvalues[x+j], 16, 16);
        }
    }
  }
}