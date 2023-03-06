let ypos = 15;
let ystep = 20;
let xpos = 20;
let xstep = 10;

let collum = 0;

function draw_one_frame() {

fill(20);
rect(0, 0, width+1, height+1);

collum = collum + 1;
if(collum > 92) {
  collum = 0;
}

//fill('red');
//rect(collum, 0, 50, height+1);

for (let j = 0; j < 26; j++) {
    for (let i = 0; i < 92; i++) {
      if (i == collum || i == collum-1 || i == collum+1){
        fill(255);
        text('+',xpos+(xstep*i), ypos+((ystep*j)-8), 20, 20);
      } else if(i == collum-2 || i == collum+2){
        fill(255);
        text('*',xpos+(xstep*i), ypos+((ystep*j)-3), 20, 20);        
      } else if(i == collum-3 || i == collum+3){
        fill(255);
        text('-',xpos+(xstep*i), ypos+((ystep*j)-3), 20, 20); 
      } else {
        fill(255);
        text('/',xpos+(xstep*i), ypos+(ystep*j), 20, 20);
      }
    }
  }

}
