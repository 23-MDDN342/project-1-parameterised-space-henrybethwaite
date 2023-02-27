// these can be customized
const debugViewText = "#ff0000";
const debugZoomBackground = "#555588"
const debugZoomScale = 0.5;

// this can be modified after we discuss in lecture
const buffersPerFrame = 1;

// probably best not to modify anything below this line
const frameMax = 24;
let recording = false;
let gifRecorder = null;
let debugZoom = false;
let debugView = false;
let stickFrame = 0;

// *note: canvasWidth and canvasHeight will be defined before this script runs)

function setup () {
  let main_canvas = createCanvas(canvasWidth,canvasHeight);
  let r = random(100);
  main_canvas.parent('canvasContainer');
  frameRate(24 * buffersPerFrame);
}

function mousePressed(){
}

function draw () {
  let animation_max_frames = frameMax * buffersPerFrame;
  let sticky_max_frames = animation_max_frames + stickFrame;
  let cur_frame = frameCount % sticky_max_frames;
  if (cur_frame >= animation_max_frames) {
    cur_frame = 0;
  }
  let cur_frac = map(cur_frame, 0, animation_max_frames, 0, 1);

  background(debugZoomBackground);

  push();

  if(debugZoom) {
    translate(0.5 * width, 0.5 * height);
    scale(debugZoomScale);
    translate(0.5 * -width, 0.5 * -height);    
  }

  draw_one_frame(cur_frac);

  pop();

  if(debugView) {
    textSize(28);
    fill(debugViewText);
    text("" + (cur_frame/buffersPerFrame).toFixed(2) + " / " + 
      (animation_max_frames/buffersPerFrame).toFixed(2) + " = " + 
      cur_frac.toFixed(2), 50, 50);
  }

  if(recording) {
    textSize(24);
    gifRecorder.addBuffer();
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  if (key == ' ') {
    debugZoom = !debugZoom;
  }
  if (key == 'd') {
    debugView = !debugView;
  }
  if (key == '1') {
    frameRate(1);
    stickFrame = 0;
  }
  if (key == '2') {
    frameRate(5);
    stickFrame = 5;
  }
  if (key == '3') {
    frameRate(30);
    stickFrame = 0;
  }
  if (key == 'r') {
    if (recording==false){
      recording = true;
      gifRecorder = new p5recorder (frameMax, 'wallpaper.gif', buffersPerFrame);
    }    
  }
}
