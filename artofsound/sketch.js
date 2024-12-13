// SOUND
let mic;
let fft;
let fourier;
let spectrum = [];

// COLORS
let myFill;
let myBg;

// VARIABLES
let started;
let selection;

// IMAGES
let logo;
let imgGreen;
let imgRainbow;
let imgWhite;

function preload() {
  // load images
  logo = loadImage('logo.png');
  imgGreen = loadImage('https://www.cordeliart.com/artofsound/green.png');
  imgRainbow = loadImage('https://www.cordeliart.com/artofsound/rainbow.png');
  imgWhite = loadImage('https://www.cordeliart.com/artofsound/white.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(0);
  frameRate(60);
  angleMode(DEGREES);

  // set up sound stuff
  mic = new p5.AudioIn();
  mic.connect();
  fft = new p5.FFT(0.8,512);

  // set colors
  spectrum = 73;
  myFill = color(spectrum,63,100);
  myBg = color(0,0,0,.5);

  // set mode
  started = false;
  selection = "green";

  // display title
  let k = 1250/900; // logo w/h = 1250/900
  if(windowWidth < windowHeight) {
    image(logo,0,windowWidth/2 - windowWidth/k/2,windowWidth,windowWidth/k);
  } else {
    image(logo,windowWidth/2 - windowHeight*k/2,0,windowHeight*k,windowHeight);
  }
}

function draw() {
  // only launches upon click
  if(started) {
    noStroke();
    fill(myBg);
    rect(0, 0, windowWidth, windowHeight);
    let vol = mic.getLevel();
  
    if(selection == "rainbow") {
      // RAINBOW FFT MODE
      frameRate(60);
      background(0);
      fourier = fft.analyze();
      ellipseMode(CENTER);
      strokeWeight(2);
      fill(0);
      for (let i=0; i < fourier.length; i ++) {
        let r = 0.8*min(windowWidth,windowHeight)-4*i;
        myFill = color((10+2*i)%255,63,100);
        myFill.setAlpha(map(fourier[i],0,255,0,1));
        stroke(myFill);
        ellipse(windowWidth/2, windowHeight/2, r, r);
      }
    }

    else if(selection == "white") {
      // WHITE MODE
      frameRate(60);
      myFill = color(255);

      push();
      fill(myFill);
      rect(0,0,windowWidth,windowHeight);
      pop();

      push();
      let gradient = this.drawingContext.createLinearGradient(0, 2 * height, 0, height / 3, 0);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      this.drawingContext.fillStyle = gradient;
      rect(0,0,windowWidth,windowHeight);
      pop();
      
      noFill();
      stroke(myFill);
      strokeWeight(8);

      let inner = vol*2000+15;
      let middle = 250+1000*vol;
      let outer = 300+1000*vol;
      let x0 = windowWidth/2;
      let y0 = windowHeight/2;
      let pull = 200 + 10*sin(second());
      let pull2 = 100 + vol*2500;
    
      beginShape();
      vertex(x0, y0 - middle);
      bezierVertex(x0 + pull2, y0 - middle, x0 + middle, y0 - pull2, x0 + middle, y0);
      bezierVertex(x0 + middle, y0 + pull2, x0 + pull2, y0 + middle, x0, y0 + middle);
      bezierVertex(x0 - pull2, y0 + middle, x0 - middle, y0 + pull2, x0 - middle, y0);
      bezierVertex(x0 - middle, y0 - pull2, x0 - pull2, y0 - middle, x0, y0 - middle);
      endShape();
      
      strokeWeight(2);
      beginShape();
      vertex(x0 - outer, y0 - outer);
      bezierVertex(x0 - outer + pull2, y0 - outer - pull2, x0 + outer - pull2, y0 - outer - pull2, x0 + outer, y0 - outer);
      bezierVertex(x0 + outer + pull2, y0 - outer + pull2, x0 + outer + pull2, y0 + outer - pull2, x0 + outer, y0 + outer);
      bezierVertex(x0 + outer - pull2, y0 + outer + pull2, x0 - outer + pull2, y0 + outer + pull2, x0 - outer, y0 + outer);
      bezierVertex(x0 - outer - pull2, y0 + outer - pull2, x0 - outer - pull2, y0 - outer + pull2, x0 - outer, y0 - outer);
      endShape();
      
      fill(myFill);
      noStroke();
      beginShape();
      vertex(x0 - inner, y0 - inner);
      bezierVertex(x0 - inner + pull, y0 - inner - pull, x0 + inner - pull, y0 - inner - pull, x0 + inner, y0 - inner);
      bezierVertex(x0 + inner + pull, y0 - inner + pull, x0 + inner + pull, y0 + inner - pull, x0 + inner, y0 + inner);
      bezierVertex(x0 + inner - pull, y0 + inner + pull, x0 - inner + pull, y0 + inner + pull, x0 - inner, y0 + inner);
      bezierVertex(x0 - inner - pull, y0 + inner - pull, x0 - inner - pull, y0 - inner + pull, x0 - inner, y0 - inner);
      endShape();
    }

    else if(selection == "green") {
      // GREEN GRID MODE
      let volmod = round(1000*vol)%3;
      console.log(1000*vol,volmod);
      frameRate(25);

      let sq = max(windowHeight,windowWidth);
      fill(73,63,100);

      squares(0,0,volmod+1,sq/2,"odd");
      squares(sq/2,0,volmod+1,sq/2,"even");
      squares(sq/2,0,2,sq/2,"odd");
      squares(sq/2,sq/2,3,sq/2,"even");
      squares(sq/2,sq*3/4,volmod+1,sq*3/4,"odd");

      push();
      stroke(73,63,100);
      star(sq/4,sq*3/4,sq/4,12);
      pop();

      push();
      fill(0);
      squares(sq/4,0,volmod+5,sq/2,"odd");
      squares(0,sq/4,volmod+3,sq*3/8,"even");
      
      stroke(0);
      strokeWeight(4);
      noFill();
      star(sq,sq/4,sq/4,20+volmod);
      ellipse(sq/4, sq*3/4, sq*(volmod % 3+3)/8/2, sq*(volmod%3+3)/8/2);
      ellipse(sq/4, sq*3/4, sq*(volmod % 3+5)/10/2, sq*(volmod%3+5)/10/2);
      pop();
    }

    // TOGGLE ICONS
    image(imgGreen, 24, 24, 36, 36);
    image(imgRainbow, 24+36+12, 24, 36, 36);
    image(imgWhite, 24+36+12+36+12, 24, 36, 36);
  }
}

function touchStarted() {
  started = true;
  mic.start();
  getAudioContext().resume();
  background(0);
}

function mouseClicked() {
  // check position and toggle between versions
  if (mouseX < 24+36 && mouseX > 24 && mouseY > 24 && mouseY < 24+36) {
    selection = "green";
  }
  else if (mouseX < 24+36+12+36 && mouseX > 24+36+12 && mouseY > 24 && mouseY < 24+36) {
    selection = "rainbow";
  }
  else if (mouseX < 24+36+12+36+12+36 && mouseX > 24+36+12+12+36 && mouseY > 24 && mouseY < 24+36) {
    selection = "white";
  }
}

function squares(x,y,n,squareWidth,parity) {
  // generates subdivided (recursive) square grid
  if(n==1) {
    if(parity == "even") {
      rect(x,y,squareWidth/2,squareWidth/2);
      rect(x+squareWidth/2,y+squareWidth/2,squareWidth/2,squareWidth/2);
    } else if(parity == "odd") {
      rect(x+squareWidth/2,y,squareWidth/2,squareWidth/2);
      rect(x,y+squareWidth/2,squareWidth/2,squareWidth/2);
    }
  } else {
    squares(x,y,n-1,squareWidth/2,parity);
    squares(x+squareWidth/2,y,n-1,squareWidth/2,parity);
    squares(x,y+squareWidth/2,n-1,squareWidth/2,parity);
    squares(x+squareWidth/2,y+squareWidth/2,n-1,squareWidth/2,parity);
  }
}

function star(x,y,r,k) {
  // displays star
  k = 360/k;
  r -= 2;
  push();
  strokeWeight(4);
  for(let i = 0; i < 360; i ++) {
    line(x,y,x-r*cos(k*i),y+r*sin(k*i));
  }
  pop();
}