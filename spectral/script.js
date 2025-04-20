// MENU INTERATIONS -------------------------

const body = document.querySelector("body"),
    menu = body.querySelector(".menu"),
    minimizer = body.querySelector(".minimizer"),
    menuBasics = body.querySelector(".menuBasics"),
    menuMatrix = body.querySelector(".menuMatrix"),
    menuInteract = body.querySelector(".menuInteract"),
    mbasics = body.querySelector(".basics"),
    mmatrix = body.querySelector(".matrix"),
    minteract = body.querySelector(".interact");
var active = false;
var scrollSections = body.querySelectorAll(".snapscroll")

scrollSections.forEach(section => {
    // DOT ARRAY for each dot container
    section.dots = Array.from(section.querySelectorAll(".dot"));
    section.dotCount = section.dots.length;
    section.activeId = -1;
    section.scrollPos = 0;
    section.scrollDir = "down";

    // CHECK DOTS FOR CLICK
    for(var i = 0; i < section.dotCount; i++) { section.dots[i].num = i; }
    
    section.dots.forEach(adot => {
        adot.addEventListener("click", () =>{
        section.activeId = section.adot.num;
        // clear old
        for(var j = 0; j < section.dotCount; j++) {
            section.dots[j].classList.remove("circled");
        }
        // var scrollsec = document.getElementByID(i);
        // scrollsec.scrollIntoView({ block: "end" });
        // switch to new
        section.dots[section.activeId].classList.add("circled");
        })
    })

    // SCROLL DIRECTION
    section.addEventListener("scroll", () => {
        if((section.getBoundingClientRect()).top > section.scrollPos) {
            section.scrollDir = "up";
        } else { section.scrollDir = "down"; }
        section.scrollPos = (section.getBoundingClientRect()).top;
    })
    
    // CHECK SCROLL
    section.addEventListener("scrollsnapchange", () =>{
        // SCROLLING DOWN
        if (section.scrollDir == "down" && section.activeId < section.dotCount) {
            for(var iDown = 0; iDown < section.dotCount; iDown++) {
                section.dots[iDown].classList.remove("circled");
            }
            section.activeId += 1;
            section.dots[section.activeId].classList.add("circled");
        }
        // SCROLLING UP
        if (section.scrollDir == "up") {
            for(var iUp = 0; iUp < section.dotCount; iUp++) {
                section.dots[iUp].classList.remove("circled");
            }
            section.activeId -= 1;
            section.dots[section.activeId].classList.add("circled");
        }
        section.scrollPos = (section.getBoundingClientRect()).top;
    })
})
minimizer.addEventListener("click", () =>{
    menu.classList.toggle("hidden");
})
menuBasics.addEventListener("click", () =>{
    if (menu.classList.contains("full")) {
        menu.classList.remove("full");
    }
    menu.classList.add("hidden");
    mbasics.classList.add("selected");
    mmatrix.classList.remove("selected");
    minteract.classList.remove("selected");
})
menuMatrix.addEventListener("click", () =>{
    if (menu.classList.contains("full")) {
        menu.classList.remove("full");
    }
    menu.classList.add("hidden");
    mbasics.classList.remove("selected");
    mmatrix.classList.add("selected");
    minteract.classList.remove("selected");    
})
menuInteract.addEventListener("click", () =>{
    if (menu.classList.contains("full")) {
        menu.classList.remove("full");
    }
    menu.classList.add("hidden");
    mbasics.classList.remove("selected");
    mmatrix.classList.remove("selected");
    minteract.classList.add("selected");
})

// INTERACT -------------------------

var varOrig = document.getElementById("varOrig"),
    varNew = document.getElementById("varNew"),
    varInv = document.getElementById("varInv"),
    varEigs = document.getElementById("varEigs"),
    showCircles = document.getElementById("col1"),
    showLines = document.getElementById("col2");
var checks = [varOrig, varNew, varInv];

var eigenvecs, eigenvals, deg1, deg2, // eigenstuff
    myMatrix, inv, // matrices
    scalar, count0, // unit circle stuff
    myHeight, myWidth, // dimensions
    unitCircle, newCoords, invCoords,
    permUnit, permNew, permInv; // COORD CLASS INSTANCES

function sketchInt(p) {
    checks.forEach(element => {
        element.querySelector(".checkCir").onclick = function(){ faded(element); }
        element.querySelector(".checkLine").onclick = function(){ faded(element); }
        element.querySelector("p").onclick = function(){
            if (element.querySelector(".checkCir").checked == false && element.querySelector(".checkLine").checked == false) {
                element.querySelector(".checkCir").checked = true;
                element.querySelector(".checkLine").checked = true;
                element.style.opacity = "100%";
                p.drawing();
            } else {
                element.querySelector(".checkCir").checked = false;
                element.querySelector(".checkLine").checked = false;
                element.style.opacity = "50%";
                p.drawing();
            }
        }
    });
    function faded(element) {
        if (element.querySelector(".checkCir").checked == false && element.querySelector(".checkLine").checked == false) {
            element.style.opacity = "50%";
        }
        else { element.style.opacity = "100%"; }
        p.drawing();
    }
    varEigs.querySelector(".checkLine").checked = true;
    varEigs.onclick = function(){
        if (varEigs.querySelector(".checkLine").checked) { varEigs.style.opacity = "100%"; } else { varEigs.style.opacity = "50%"; }
        p.drawing();
    }
    varEigs.querySelector("p").onclick = function(){
        varEigs.querySelector(".checkLine").checked = !varEigs.querySelector(".checkLine").checked;
        if (varEigs.querySelector(".checkLine").checked) { varEigs.style.opacity = "100%"; } else { varEigs.style.opacity = "50%"; }
        p.drawing();
    }
    showCircles.addEventListener("click", function(){
        par = !varOrig.querySelector(".checkCir").checked;
        checks.forEach(element => {
            element.querySelector(".checkCir").checked = par;
            faded(element);
        })
        p.drawing();
    })
    showLines.addEventListener("click", function(){
        par = !varOrig.querySelector(".checkLine").checked;
        checks.forEach(element => {
            element.querySelector(".checkLine").checked = par;
            faded(element);
        })
        varEigs.querySelector(".checkLine").checked = par;
        if (varEigs.querySelector(".checkLine").checked) { varEigs.style.opacity = "100%"; } else { varEigs.style.opacity = "50%"; }
        p.drawing();
    })
    
    // ----------------------------------------------------------------------------------------------------------------
    // SLIDER
    
    var slider = document.getElementById("lineCount"),
        count = slider.value;
    
    slider.oninput = function(){
        count = slider.value;
        initialize();
    }
    p.setup = function () {
        // canvas
        myHeight = p.windowHeight;
        myWidth = p.windowWidth;
        scalar = p.min(myWidth,myHeight)/8;
        p.myCanvas = p.createCanvas(myWidth, myHeight, p.WEBGL);
        p.myCanvas.position(0,0);
        p.myCanvas.parent("#canvasInt");
    
        // styling
        p.strokeWeight(1);
        p.ellipseMode(p.CENTER);
        p.noFill();
    
        // start
        p.initialize();
        permUnit = unitCircle;
        permNew = newCoords;
        permInv = invCoords;
        count0 = count;
        p.drawing();
    }

    // ----------------------------------------------------------------------------------------------------------------
    // MAIN FUNCTIONS

    p.initialize = function() {
        // create Coords
        unitCircle = new Coords();
        for (i = 0; i < count; i++) {
            amount = i/count*2*p.PI;
            // amount = map(i,0,count,0,2*PI);
            unitCircle.x[i] = scalar*p.cos(amount);
            unitCircle.y[i] = scalar*p.sin(amount);
        }
        newCoords = new Coords();
        invCoords = new Coords();
        p.setPoints();
        p.drawing();
    }

    p.setPoints = function() {
        // shift
        eigenvecs = [2.2,-2,2,12];
        eigenvals = [4,0,0,1];
        // eigenvals[3] = ((frameCount)%200*0.01) + 1;
    
        // calculate matrices
        myMatrix = matrixMult(eigenvecs,matrixMult(eigenvals,matrixInv(eigenvecs)));
        inv = matrixInv(myMatrix);
        deg1 = p.atan(eigenvecs[2]/eigenvecs[0]);
        deg2 = p.atan(eigenvecs[3]/eigenvecs[1]);
    
        // add transformed to coords
        for (i = 0; i < count; i += 2) {
            newCoords.x[i] = myMatrix[0]*unitCircle.x[i] + myMatrix[1]*unitCircle.y[i];
            newCoords.y[i] = myMatrix[2]*unitCircle.x[i] + myMatrix[3]*unitCircle.y[i];
            invCoords.x[i] = inv[0]*unitCircle.x[i] + inv[1]*unitCircle.y[i];
            invCoords.y[i] = inv[2]*unitCircle.x[i] + inv[3]*unitCircle.y[i];
        }
        
        var updateMat = document.getElementById("intMat");
        updateMat.innerHTML = "$$\\begin{bmatrix}"+String(Math.round(myMatrix[0]*100)/100)+"&"+String(Math.round(myMatrix[1]*100)/100)+"\\\\"+String(Math.round(myMatrix[2]*100)/100)+"&"+String(Math.round(myMatrix[3]*100)/100)+"\\end{bmatrix}$$";
        MathJax.typesetPromise([updateMat]).then(() => {});

        var updateEigs1 = document.getElementById("intEigs1");
        updateEigs1.innerHTML = "$$\\scriptsize{\\lambda_1="+String(Math.round(eigenvals[0]*100)/100)+", u_1 = \\langle "+String(Math.round(eigenvecs[0]*100)/100)+", "+String(Math.round(eigenvecs[2]*100)/100)+"\\rangle}$$";
        MathJax.typesetPromise([updateEigs1]).then(() => {});

        var updateEigs2 = document.getElementById("intEigs2");
        updateEigs2.innerHTML = "$$\\scriptsize{\\lambda_1="+String(Math.round(eigenvals[3]*100)/100)+", u_1 = \\langle "+String(Math.round(eigenvecs[1]*100)/100)+", "+String(Math.round(eigenvecs[3]*100)/100)+"\\rangle}$$";
        MathJax.typesetPromise([updateEigs2]).then(() => {});
    }
    
    p.drawing = function () {
        p.background(0, 0, 30);
        timer = 0;
    
        // BLUE ORIGINAL
        if (varOrig.querySelector(".checkLine").checked) {
            p.stroke(101,106,255);
            for (i = 0; i < count; i += 2) {
                vector(unitCircle.x[i],unitCircle.y[i]); // original
                vector(newCoords.x[i],newCoords.y[i],unitCircle.x[i],unitCircle.y[i]); // to displacement
            }
        }
        if (varOrig.querySelector(".checkCir").checked) {
            p.stroke(101,106,255);
            p.ellipse(0,0,2*scalar,2*scalar,p.min(count0,50)); // ellipse
        }
    
        // GREEN NEW
        if (varNew.querySelector(".checkLine").checked) {
            p.stroke(222,255,35);
            p.push();
                p.fill(222,255,35);
                for (i = 0; i < count; i += 2) {
                    vector(newCoords.x[i],newCoords.y[i],-1*newCoords.x[i],-1*newCoords.y[i]);
                    // vector(newCoords.x[i],newCoords.y[i]); // lines
                    p.ellipse(newCoords.x[i],-1*newCoords.y[i],6); // dots
                }
            p.pop();
        }
        if (varNew.querySelector(".checkCir").checked) {
            p.stroke(222,255,35);
            p.beginShape();
            for (i = 0; i < count0; i += 2) { p.vertex(permNew.x[i],-1*permNew.y[i]); } // ellipse
            p.endShape(p.CLOSE);
        }
    
        // PINK INVERSE
        if (varInv.querySelector(".checkLine").checked) {
            p.stroke(231,239,249);
            for (i = 0; i < count; i += 2) { vector(invCoords.x[i],invCoords.y[i],unitCircle.x[i],unitCircle.y[i]); } // lines
        }
        if (varInv.querySelector(".checkCir").checked) {
            p.stroke(231,239,249);
            p.beginShape();
            for (i = 0; i < count0; i += 2) { p.vertex(permInv.x[i],-1*permInv.y[i]); } // ellipse
            p.endShape(p.CLOSE);
            // 19,6,90
        }
    
        // WHITE EIGENS
        if (varEigs.querySelector(".checkLine").checked) {
            p.stroke(222,255,35);
            p.push();
                p.strokeWeight(4);
                vector(eigenvals[0]*p.cos(deg1)*scalar,eigenvals[0]*p.sin(deg1)*scalar);
                vector(eigenvals[3]*p.cos(deg2)*scalar,eigenvals[3]*p.sin(deg2)*scalar);
            p.pop();
        }
    }
    p.draw = function () {
        p.ellipse(eigenvecs[0]*scalar/2,-1*eigenvecs[2]*scalar/2,10);
        p.ellipse(eigenvecs[1]*scalar/2,-1*eigenvecs[3]*scalar/2,10);
        if (p.dist(eigenvecs[0]*scalar,eigenvecs[2]*scalar,p.mouseX-myWidth/2,p.mouseY-myHeight/2) <= 20) {
            background("red");
        }
    }
    

    p.mousePressed = function() {
        if (p.dist(eigenvecs[1]*scalar,eigenvecs[3]*scalar,p.mouseX-p.windowWidth/2,p.mouseY-p.windowHeight/2) <= 20) {
            background("red");
            p.push();
            p.fill(255,255,255);
            p.ellipse(p.mouseX-p.windowWidth/2,p.mouseY-p.windowHeight/2,20);
            p.pop();
        }
    }
    
    function vector(x, y, x0 = 0, y0 = 0) {
        // draws line from (x0,y0) (center of canvas by default) to (x,y)
        p.line(x0,-1*y0,x,-1*y);
    }
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth,p.windowHeight);
        p.initialize();
    }
}

function matrixInv(mat) {
    // calculates inverse of a 2x2 nonsingular matrix
    inv = [];
    det = mat[0]*mat[3] - mat[1]*mat[2];
    if (det != 0) {
        inv[0] = mat[3]/det;
        inv[3] = mat[0]/det;
        inv[1] = -1*mat[1]/det;
        inv[2] = -1*mat[2]/det;
    }
    return inv;
}
function matrixMult(mat1, mat2) {
    // calculates matrix product of two 2x2 matrices
    prod = [];
    prod[0] = mat1[0]*mat2[0] + mat1[1]*mat2[2];
    prod[2] = mat1[2]*mat2[0] + mat1[3]*mat2[2];
    prod[1] = mat1[0]*mat2[1] + mat1[1]*mat2[3];
    prod[3] = mat1[2]*mat2[1] + mat1[3]*mat2[3];
    return prod;
}
class Coords {
    constructor() {
        this.x = [];
        this.y = [];
    }
}

// VECTORS -------------------------

var x1, y1;

// function sketchId(p) {
//     // p.variable = ;
//     p.setup = function () {
//         // canvas
//         p.dimen = p.min(.8*p.windowWidth/2,1000/2);
//         p.myCanvas = p.createCanvas(p.dimen, p.dimen);
//         p.myCanvas.parent("#vecId");
//         p.colorMode(p.RGB,255,255,255,1);
//         p.frameRate(10);
//         p.textSize(24);
//         p.textAlign(p.CENTER, p.CENTER)
    
//         // styling
//         p.ellipseMode(p.CENTER);
//         p.noFill();

//         x1 = p.dimen*3/4;
//         y1 = p.dimen*1/3;

//         // GRID
//         p.background(231,239,249,1);
//         p.stroke(12,8,36,1);
//         p.strokeWeight(1.5);
//         p.line(p.dimen/2,1/6*p.dimen,p.dimen/2,5/6*p.dimen);
//         p.line(1/6*p.dimen,p.dimen/2,5/6*p.dimen,p.dimen/2);
//         // ORIGINAL
//         p.line(x1,p.dimen/2,x1,y1);
//         p.line(p.dimen/2,y1,x1,y1);
//         p.strokeWeight(4);
//         p.line(p.dimen/2,p.dimen/2,p.dimen*3/4,p.dimen*1/3);
//         p.fill(231,239,249,1);
//         p.ellipse(p.dimen*3/4,p.dimen*1/3,10);

//         p.push();
//         p.noStroke();
//         p.text("v₁",(x1-p.dimen/2)*1/2+p.dimen/2,p.dimen/2-15);
//         p.text("v₂",p.dimen/2+15,(-1*y1-p.dimen/2)*(-1)/2);
//         p.pop();
//     }
// }

function sketchVec1(p) {
    // p.variable = ;
    p.setup = function () {
        // canvas
        p.dimen = p.min(.8*p.windowWidth/2,1000/2);
        p.myCanvas = p.createCanvas(p.dimen, p.dimen);
        p.myCanvas.parent("#vector1");
        p.colorMode(p.RGB,255,255,255,1);
        p.frameRate(10);
        p.textSize(24);
        p.textAlign(p.CENTER, p.CENTER)
    
        // styling
        p.ellipseMode(p.CENTER);
        p.noFill();

        x1 = p.dimen*3/4;
        y1 = p.dimen*1/3;
    }

    p.draw = function () {
        // GRID
        p.background(231,239,249,1);
        p.stroke(12,8,36,1);
        p.strokeWeight(1.5);
        p.line(p.dimen/2,1/6*p.dimen,p.dimen/2,5/6*p.dimen);
        p.line(1/6*p.dimen,p.dimen/2,5/6*p.dimen,p.dimen/2);
        // ORIGINAL
        p.strokeWeight(4);
        p.line(p.dimen/2,p.dimen/2,p.dimen*3/4,p.dimen*1/3);
        p.fill(231,239,249,1);
        p.ellipse(p.dimen*3/4,p.dimen*1/3,10);

        // LINES
        p.strokeWeight(1.5);
        p.stroke(101,106,255,.2);
        p.line(x1,1/6*p.dimen,x1,5/6*p.dimen);
        p.line(1/6*p.dimen,y1,5/6*p.dimen,y1);
        p.stroke(101,106,255,1);
        p.line(x1,p.dimen/2,x1,y1);
        p.line(p.dimen/2,y1,x1,y1);
        p.strokeWeight(4);
        p.line(p.dimen/2,p.dimen/2,x1,y1);
        p.fill(231,239,249,1);
        p.ellipse(x1,y1,10);

        p.push();
        p.noStroke();
        p.fill(101,106,255,1);
        p.text("v₁",(x1/2+p.dimen/4),p.dimen/2-12);
        p.text("v₂",p.dimen/2+15,(y1/2+p.dimen/4));
        p.pop();

        if (p.dragging1) {
            x1 = p.mouseX;
            y1 = p.mouseY;
            replacer((x1-p.dimen/2)*4/(p.dimen),(y1-p.dimen/2)*(-6)/(p.dimen));
        }
    }

    p.mousePressed = function() {
        if (p.dist(x1,y1,p.mouseX,p.mouseY) < 15) { p.dragging1 = true; }
    }

    p.mouseReleased = function() {
        p.dragging1 = false;
    }
}

function replacer(x,y) {
    var v1 = String(Math.round(x*100)/100);
    var v2 = String(Math.round(y*100)/100);
    var node = document.getElementById('vec1replace');
    node.innerHTML = "$$\\begin{bmatrix}"+v1+" & 0 \\\\0&"+v2+" \\end{bmatrix} {\\color{black} \\begin{bmatrix}v_1 \\\\v_2 \\end{bmatrix}}=\\begin{bmatrix}"+v1+"{\\color{black}v_1}\\\\"+v2+"{\\color{black}v_2} \\end{bmatrix}$$";
    MathJax.typesetPromise([node]).then(() => {});

    var calcNode = document.getElementById('vec1calc');
    calcNode.innerHTML = "$$ A{\\color{black}v} = \\begin{bmatrix}"+v1+"& 0 \\\\ 0 &"+v2+"\\end{bmatrix}{\\color{black}\\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix}} = \\begin{bmatrix} "+v1+"{\\color{black}(v_1)} + 0{\\color{black}(v_2)} \\\\ 0{\\color{black}(v_1)} + "+v2+"{\\color{black}(v_2)} \\end{bmatrix} =\\begin{bmatrix}"+v1+"{\\color{black}v_1} \\\\ "+v2+"{\\color{black}v_2}\\end{bmatrix}$$";
    MathJax.typesetPromise([calcNode]).then(() => {});
}

// ----------------------------------------------------------------------------------------------------------------
// CALL CANVAS FUNCTIONS

new p5(sketchInt);
// new p5(sketchId);
new p5(sketchVec1);