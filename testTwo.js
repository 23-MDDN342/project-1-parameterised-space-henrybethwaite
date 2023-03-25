let ypos = 5;
let ystep = 15;
let xpos = 5;
let xstep = 10;

let char = ['', '.', '-', '+', '%', '▓', '█'];

let collum = 5;

function draw_one_frame(cur_frac) {

fill(30);
rect(0, 0, width+1, height+1);
textSize(width/100);

if (debugView) {
    fill('red');
    rect(0+collum,0,10, height+1);
}

if (collum > width){
    collum = 5;
}

textSize(width/100);

for (let j = 1 ; j < 35 ; j++) {
    for (let i = 1 ; i < 94 ; i++) {
        let noiseTerrain = getNoiseValue(xpos*i, ypos*j, 0.5, "gridNoise", 0, 5, 50);
        if ((xpos+(xstep*i)) == collum || (xpos+(xstep*i)) == collum+xstep || (xpos+(xstep*i)) == collum-xstep){
        fill(255);
        text(char[(int(noiseTerrain))+2],xpos+(xstep*i), (ypos+(ystep*j))-25, 20, 20);
        } else if((xpos+(xstep*i)) == collum+(xstep*2) || (xpos+(xstep*i)) == collum+(-xstep*2) || (xpos+(xstep*i)) == collum+(-xstep*4) || (xpos+(xstep*i)) == collum+(xstep*4)){
            text(char[(int(noiseTerrain))+1],xpos+(xstep*i), (ypos+(ystep*j))-15, 20, 20);
            } else {
                fill(255);
                text(char[int(noiseTerrain)],xpos+(xstep*i), ypos+(ystep*j), 20, 20);    
                }
    }
  }

collum = collum+xstep*2;

}