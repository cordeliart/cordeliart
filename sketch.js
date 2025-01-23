// SOUND
let fft;
let song;
let amplitude;
let fourier;
let spectrum = [];
let vmin;
let isPaused;
let started;

// COLORS
let myFill;
let myBg;
let shifter;

function preload() {
  song = loadSound('images/sound/sad.mp3');
}

function setup() {
  vmin = min(windowWidth,windowHeight);
  shifter = 5;
  started = false;
  isPaused = true;
  textFont('Syne');

  let myCanvas = createCanvas(vmin, vmin);
  myCanvas.parent("box");
  colorMode(HSB);
  background(0);
  frameRate(60);
  angleMode(DEGREES);
  ellipseMode(CENTER);

  // set colors
  spectrum = 73;
  myFill = color(spectrum,63,100);
  myBg = color(0,0,0,.5);
}

function draw() {
  // only launches upon click
  noStroke();
  fill(myBg);
  rect(0, 0, vmin, vmin);
  frameRate(30);
  background(0);

  if (started) {
    fourier = fft.analyze();
    strokeWeight(3);
    fill(0);
    shifter += 1;
    for (let i=0; i < fourier.length/2; i += 2) {
      let r = 0.8*vmin-4*i;
      myFill = color((shifter+i)%350,63,100);
      myFill.setAlpha(map(fourier[i],0,255,0,1));
      stroke(myFill);
      ellipse(vmin/2, vmin/2, r, r);
    }
  }

  push();
    fill((25,25,25));
    textSize(20);
    textAlign(CENTER, CENTER);
  if (isPaused == true) {
    text("click anywhere to play", vmin/2, vmin/2);
  }
  else {
    text("click anywhere to pause", vmin/2, vmin/2);
  }
  pop();
}

function mousePressed() {
  if (!started) {
    song.loop();
    song.pause();
    amplitude = new p5.Amplitude();
    amplitude.setInput(song);
    fft = new p5.FFT(0.8,512);
    started = true;
    song.play();
    isPaused = false;
  }
  else {
    if (isPaused == true) {
      song.play();
      isPaused = false;
    }
    else {
      song.pause();
      isPaused = true;
    }
  }
}

function touchStarted() {
  if (!started) {
    song.loop();
    song.pause();
    amplitude = new p5.Amplitude();
    amplitude.setInput(song);
    fft = new p5.FFT(0.8,512);
    started = true;
    song.play();
    isPaused = false;
  }
  else {
    if (isPaused == true) {
      song.play();
      isPaused = false;
    }
    else {
      song.pause();
      isPaused = true;
    }
  }
}

function windowResized() {
  vmin = min(windowWidth,windowHeight);
  resizeCanvas(vmin, vmin);
}
