
function p5recorder(numFrames, filename, buffersPerFrame, delay, repeat) {
  this.numFrames = numFrames;
  // all other arguments are optional
  if(buffersPerFrame) {
    this.buffersPerFrame = buffersPerFrame;
  }
  else {
    this.buffersPerFrame = 1;
  }
  if(filename) {
    this.filename = filename;
  }
  else {
    this.filename = "download.gif";
  }
  if(delay) {
    this.delay = delay;
  }
  else {
    this.delay = 1000/24; // expect 24 fps
  }
  if(repeat) {
    this.repeat = repeat;
  }
  else {
    this.repeat = 0; // 0 -> loop forever
  }

  this.encoder = new GIFEncoder();
  this.offscreenCanvas = document.createElement('canvas');
  this.offscreenCanvas.width = width;
  this.offscreenCanvas.height = height;
  this.offscreenContext = this.offscreenCanvas.getContext('2d');

  this.framesRecorded = 0;
  this.buffersRecorded = 0;
  this.imageAccumulator = null;
  this.encoder_has_started = false;
  pixelDensity(1);

  this.addBuffer = function() {
    if(!this.encoder_has_started) {
      this.encoder.setRepeat(this.repeat);
      this.encoder.setDelay(this.delay);
      this.encoderResult = this.encoder.start();
      this.encoder_has_started = true;
    }

    let display_text = "Recording: " + (this.framesRecorded+1) + " / " + this.numFrames;
    if (this.framesRecorded < this.numFrames) {
      // background is flat white
      this.offscreenContext.fillStyle="#FFFFFF";
      this.offscreenContext.fillRect(0, 0, width, height);
      this.offscreenContext.drawImage(canvas, 0, 0, width, height);

      if (this.buffersPerFrame > 1) {
        display_text = "Recording: " + (this.buffersRecorded+1) + " / " + this.buffersPerFrame + " : " + (this.framesRecorded+1) + " / " + this.numFrames;
        // each output image is made up of several input frames averaged together
        if (this.buffersRecorded == 0) {
          // initialize a new output Image
          this.imageAccumulator = new Array(width * height);
          for (let i=0; i<width*height; i++) {
            this.imageAccumulator[i] = [0, 0, 0];
          }
        }
        loadPixels();
        for (let i=0; i<pixels.length/4; i++) {
          // print(i);
          // print(imageAccumulator[i])
          // print(pixels[i])
          this.imageAccumulator[i][0] += pixels[i*4+0];
          this.imageAccumulator[i][1] += pixels[i*4+1];
          this.imageAccumulator[i][2] += pixels[i*4+2];
        }
        this.buffersRecorded = this.buffersRecorded + 1;
        if(this.buffersRecorded == this.buffersPerFrame) {
          // record this version and increment framesRecorded
          loadPixels();
          for (let i=0; i<pixels.length/4; i++) {
            pixels[i*4+0] = int(this.imageAccumulator[i][0] * 1.0/this.buffersPerFrame);
            pixels[i*4+1] = int(this.imageAccumulator[i][1] * 1.0/this.buffersPerFrame);
            pixels[i*4+2] = int(this.imageAccumulator[i][2] * 1.0/this.buffersPerFrame);
            pixels[i*4+3] = 255;
          }
          updatePixels();
          this.imageAccumulator = null;

          // reload this version onto the offscreen buffer
          this.offscreenContext.fillStyle="#FFFFFF";
          this.offscreenContext.fillRect(0, 0, width, height);
          this.offscreenContext.drawImage(canvas, 0, 0, width, height);

          this.encoder.addFrame(this.offscreenContext);
          this.framesRecorded = this.framesRecorded + 1;
          this.buffersRecorded = 0;
        }
      }
      else {
        this.encoder.addFrame(this.offscreenContext);
        this.framesRecorded = this.framesRecorded + 1;
      }
      if(this.framesRecorded == this.numFrames) {
        this.encoder.finish();
        this.encoder.download(this.filename);
      }
    }
    else {
        display_text = "Recording: done";
    }
    fill(255, 0, 0);
    textSize(48);
    text(display_text, 50, height-20);
  }
}
