/**
 * Lena Pang
 * IGME-101: Project 1 Tributes, 9/20/22
 * Create two interactive scenes paying tribute to famous artists.
 * 
 * I chose Josef Muller Brockmann and Bryce Hudson, two geometric abstract designers who heavily emphasize shape and order in their designs. I recreated the radially expanding circles from Brockmann's Beethoven poster (1995) using the same proportions, and the bright geometry from Bryce Hudson's Untitled 43 (2014) using color dropping for colors accurate to the source material.
 * Brockmann URL: https://www.behance.net/gallery/9862277/Mueller-Brockmanns-Beethoven-Poster-Geometric-Analysis
 * Hudson URL: http://www.brycehudson.com/geometric-abstraction-painting-untitled-43-bryce-hudson/
 */

"use strict"; //catch some common coding errors

/* Global variables */
let Brockmann = true;
let BryceHudson = false;
let shiftblack = 0; //shifts black squares in Hudson scene
let shiftorange = 0; //shifts horizontal orange rectangle + red square in Hudson scene
let shiftorange2 = 0; //shifts vertical orange rectangle  in Hudson scene
let yellowshift = 0; //shifts yellow rectangle in Hudson scene

/**
 * setup :
 */
function setup() {
   createCanvas(600, 600);
}

/**
 * draw :
 */
function draw() {
   if (Brockmann === true) { //call BROCKMANN SCENE
      background("white");

      //7th ring appears if x>=560 + triangles to block off to change arc length based on mouseY
      if (mouseX >= 560) {
         stroke("white");
         strokeWeight(1);
         fill("black");
         ellipse(300,300,940);
      }
      stroke("white");
      fill("white");
      triangle(300, 300, 0, 300, mouseY*1.5, 0);
      triangle(0, 0, 0, 300, mouseY*1.5, 0);

      //stationary triangles 2
      stroke("white");
      fill("white");
      triangle(0, 600, 0, 300, 500, 600);
      triangle(300, 300, 0, 300, 500, 600);
      
      //6th ring appears if x>=480 + triangles to block off to change arc length based on mouseY
      if (mouseX >= 480) {
         stroke("white");
         strokeWeight(1);
         fill("black");
         ellipse(300,300,620);
      }
      stroke("white");
      fill("white");
      triangle(300, 300, 0, 300, mouseY*.8-40, 0);
      triangle(0, 0, 0, 300, mouseY*.8-40, 0);
      
      //5th ring appears if x>=400 + triangles to block off to change arc length based on mouseY
      if (mouseX >= 400) {
         stroke("white");
         strokeWeight(1);
         fill("black");
         ellipse(300,300,460);
      }
      stroke("white");
      fill("white");
      triangle(300, 300, 0, 300, mouseY*.6-100, 0);
      triangle(0, 0, 0, 300, mouseY*.6-100, 0);
      
      //4th ring appears if x>=320 + triangles to block off to change arc length based on mouseY
      if (mouseX >= 320) {
         stroke("white");
         strokeWeight(1);
         fill("black");
         ellipse(300,300,380);
      }
      stroke("white");
      fill("white");
      triangle(300, 300, 0, 300, mouseY*.8-200, 0);
      triangle(0, 0, 0, 300, mouseY*.8-200, 0);
      
      //stationary bottom triangles 2
      stroke("white");
      fill("white");
      triangle(0, 600, 0, 300, 400, 600);
      triangle(300, 300, 0, 300, 400, 600);

      //3rd ring appears if x>=240 + triangles to block off to change arc length based on mouseY
      if (mouseX >=240) {
         stroke("white");
         strokeWeight(1);
         fill("black");
         ellipse(300,300,340);
      }
      stroke("white")
      fill("white");
      triangle(300, 300, 0, 300, 0, 250-mouseY);

      //2nd ring appears if x>=160 + triangles to block off to change arc length based on mouseY
      if (mouseX >= 160) {
         stroke("white");
         strokeWeight(1);
         fill("black");
         ellipse(300,300,320);
      }
      stroke("white")
      fill("white");
      triangle(300, 300, 0, 300, 0, 300-mouseY);
      
      //1st ring appears if x>=80
      if (mouseX >= 80) {
         stroke("white");
         strokeWeight(1);
         fill("black");
         ellipse(300,300,310);
      }

      //strationary bottom triangles 3
      stroke("white")
      fill("white");
      triangle(0, 600, 0, 300, 200, 600);
      triangle(300, 300, 0, 300, 200, 600);

      //inner (white) circle
      fill("white");
      ellipse(300,300,300);

      //instructions
      noStroke()
      fill("black");
      textSize(12);
      textAlign(CENTER);
      text("move your mouse right to increase the number of rings, and move your mouse up to increase the arc length",200,250,200);

      //text + button
      fill("red");
      rect(200,300,200,35);

      fill("white");
      textAlign(LEFT);
      textSize(16);
      text("CLICK HERE TO SWITCH",205,324);

      //info text
      strokeWeight(1);
      stroke("black");
      fill("black");
      textSize(16);
      text("Josef Müller-Brockmann",20,500);

      noStroke();
      fill("black");
      textSize(16);
      text("inspired by his Beethoven poster (1995), featuring the powers of two in an expanding radial grid",20,508,270);

      //switch between scenes if click in right spot
      if (mouseIsPressed === true && 200 <= mouseX && mouseX <= 400 && 300 <= mouseY && mouseY <=335) {
         Brockmann = false;
         BryceHudson = true;
      }
   }

   else { //call BRYCE HUDSON SCENE
      noStroke()
      background(18,147,204); //set background color

      fill(244,233,19); //moving yellow rect
      rect(0,250-yellowshift,130,30);

      fill("white") //white rect
      rect(410,0,14,600);

      fill("red"); //red rect
      rect(132,50,100,150);

      fill("black"); //black rects + circle
      rect(550,240,50,45);
      rect(80,50,50,45);
      rect(0,50,80,80);
      rect(0,340,130,90);
      circle(184,125,70);

      fill(149,150,152); //dark grey rects
      rect(130,340,100,90)
      rect(550,100,50,105);

      fill(241,105,47); //orange rects
      rect(75,0,30,600);
      rect(280,200-shiftorange,200,10); //moving orange rect
      rect(550+shiftorange2,0,10,600); //moving orange rect

      fill("red"); //moving orange rect
      rect(400,180-shiftorange,50,50);

      fill(202,207,201); //grey rect
      rect(130,0,7,600);

      fill(16,132,67); //green rect
      rect(450,0,100,600);

      fill("white"); //white rect
      rect(230,0,60,600);

      fill("black"); //black squares on white
      rect(230,-120+shiftblack,60,60);
      rect(230,0+shiftblack,60,60);
      rect(230,120+shiftblack,60,60);
      rect(230,240+shiftblack,60,60);
      rect(230,360+shiftblack,60,60);
      rect(230,480+shiftblack,60,60);

      //yellow rect for text
      fill(244,233,19);
      rect(0,450,600,600);

      //instructions
      noStroke()
      fill("black");
      textSize(12);
      text("press and hold any key to shift the shapes around!",20,470,300);

      //info text
      strokeWeight(1);
      stroke("black");
      fill("black");
      textSize(16);
      text("Bryce Hudson",20,530);

      noStroke();
      fill("black");
      textSize(16);
      text("adding movement to Hudson's colorfully geometric Untitled 43 (2014)",20,538,350);

      //switch button
      rect(350,460,240,130);
      fill(244,233,19);
      textSize(16);
      text("CLICK HERE TO SWITCH",376,526); 

      //switch between scenes if click in right spot
      if (mouseIsPressed === true && 350 <= mouseX && mouseX <= 590 && 460 <= mouseY && mouseY <=590) {
         Brockmann = true;
         BryceHudson = false;
      }

      //make the location variables shift when a key is pressed
      if (keyIsPressed) {
         shiftblack = shiftblack+1;
         shiftorange = shiftorange+2;
         shiftorange2 = shiftorange2+1;
         yellowshift = yellowshift+3;

         if (shiftblack >= 120) {
            shiftblack=0;
         }
         if (shiftorange >= 230) {
            shiftorange = -270;
         }
         if (shiftorange2 >= 80) {
            shiftorange2 = -10;
         }
         if (yellowshift >= 200) {
            yellowshift = -100;
         }
      }
   }
}