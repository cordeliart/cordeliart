// SOUND
let fft;
let song;
let amplitude;
let fourier;
let spectrum = [];
let vmin;
let isPaused;

// COLORS
let myFill;
let myBg;
let shifter;

function preload() {
  song = loadSound('sad.mp3');
}

function setup() {
  vmin = min(windowWidth,windowHeight);
  shifter = 5;
  isPaused = true;
  textFont('Syne');

  let myCanvas = createCanvas(vmin, vmin);
  myCanvas.parent("box");
  colorMode(HSB);
  background(0);
  frameRate(60);
  angleMode(DEGREES);

  // set up sound stuff
  amplitude = new p5.Amplitude();
  song.loop();
  song.pause();
  amplitude.setInput(song);
  fft = new p5.FFT(0.8,512);

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
  // let vol = amplitude.getLevel();

  frameRate(30);
  background(0);
  fourier = fft.analyze();
  ellipseMode(CENTER);
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
  if (isPaused == true) {
    song.play();
    isPaused = false;
  }
  else {
    song.pause();
    isPaused = true;
  }
}