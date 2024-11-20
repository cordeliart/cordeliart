var mic;
var displayFont;
var myGreen;

function preload() {
  displayFont = loadFont('RubikPixels-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.connect();
  mic.start();

  myGreen = color(220,255,94);
  myBlack = myGreen;
}

function draw() {
  background(0);

  fill(myGreen);
  textSize(windowWidth/8);
  textAlign(CENTER,CENTER);
  text('ART OF SOUND',windowWidth/2,windowHeight*.51);
  
  var vol = mic.getLevel();
  ellipse(windowWidth/2,windowHeight/2,100+vol*1000,100+vol*1000);
  console.log(vol);

  fill(myBlack);
  textSize(windowWidth/50);
  text('Click anywhere to begin.',windowWidth/2,windowHeight*.6);
}

function touchStarted() {
  getAudioContext().resume();
  myBlack = color(0,0,0);
} 