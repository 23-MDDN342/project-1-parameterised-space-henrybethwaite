let ypos = 5;
let ystep = 15;
let xpos = 5;
let xstep = 10;
let char = ['', '.', '-', '+', '%'];

function draw_one_frame(cur_frac) {

fill(30);
rect(0, 0, width+1, height+1);

/*----method for altering cur_frac made with help 
------from my friend Popopz */
loop_frac = cur_frac*24;

if(loop_frac > 12){
  loop_frac = 12 - (loop_frac % 12)
}

//console.log(cur_frac);

for (let j = 1 ; j < 35 ; j++) {
    for (let i = 1 ; i < 94 ; i++) {
        let noiseTerrain = getNoiseValue((xpos*i)+(loop_frac*1), (ypos*j)+(loop_frac*1.1), 0.5, "gridNoise", 0, 5, 50);
        fill(255);
        !text(char[int(noiseTerrain)],xpos+(xstep*i), ypos+(ystep*j), 20, 20);
    }
  }

}