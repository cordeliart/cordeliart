// ----------------------------------------------------------------------------------------------------------------
// CHECKBOXES

var varOrig = document.getElementById("varOrig"),
    varNew = document.getElementById("varNew"),
    varInv = document.getElementById("varInv"),
    varEigs = document.getElementById("varEigs"),
    showCircles = document.getElementById("col1"),
    showLines = document.getElementById("col2");

var checks = [varOrig, varNew, varInv];
checks.forEach(element => {
    element.querySelector(".checkCir").onclick = function(){ faded(element); }
    element.querySelector(".checkLine").onclick = function(){ faded(element); }
    element.querySelector("p").onclick = function(){
        if (element.querySelector(".checkCir").checked == false && element.querySelector(".checkLine").checked == false) {
            element.querySelector(".checkCir").checked = true;
            element.querySelector(".checkLine").checked = true;
            element.style.opacity = "100%";
            drawing();
        } else {
            element.querySelector(".checkCir").checked = false;
            element.querySelector(".checkLine").checked = false;
            element.style.opacity = "50%";
            drawing();
        }
    }
});

function faded(element) {
    if (element.querySelector(".checkCir").checked == false && element.querySelector(".checkLine").checked == false) {
        element.style.opacity = "50%";
    }
    else { element.style.opacity = "100%"; }
    drawing();
}

varEigs.querySelector(".checkLine").checked = true;
varEigs.onclick = function(){
    if (varEigs.querySelector(".checkLine").checked) { varEigs.style.opacity = "100%"; } else { varEigs.style.opacity = "50%"; }
    drawing();
}
varEigs.querySelector("p").onclick = function(){
    varEigs.querySelector(".checkLine").checked = !varEigs.querySelector(".checkLine").checked;
    if (varEigs.querySelector(".checkLine").checked) { varEigs.style.opacity = "100%"; } else { varEigs.style.opacity = "50%"; }
    drawing();
}

showCircles.addEventListener("click", function(){
    par = !varOrig.querySelector(".checkCir").checked;
    checks.forEach(element => {
        element.querySelector(".checkCir").checked = par;
        faded(element);
    })
    drawing();
})

showLines.addEventListener("click", function(){
    par = !varOrig.querySelector(".checkLine").checked;
    checks.forEach(element => {
        element.querySelector(".checkLine").checked = par;
        faded(element);
    })
    varEigs.querySelector(".checkLine").checked = par;
    if (varEigs.querySelector(".checkLine").checked) { varEigs.style.opacity = "100%"; } else { varEigs.style.opacity = "50%"; }
    drawing();
})

// ----------------------------------------------------------------------------------------------------------------
// SLIDER

var slider = document.getElementById("lineCount"),
    count = slider.value;

slider.oninput = function(){
    count = slider.value;
    initialize();
}

// ----------------------------------------------------------------------------------------------------------------
// BASIC STRUCTURE

var eigenvecs, eigenvals, deg1, deg2, // eigenstuff
    myMatrix, inv, // matrices
    scalar, count0, // unit circle stuff
    myHeight, myWidth, // dimensions
    unitCircle, newCoords, invCoords; // COORD CLASS INSTANCES

function setup() {
    // canvas
    myHeight = windowHeight,
    myWidth = windowWidth;
    scalar = min(myWidth,myHeight)/5
    let myCanvas = createCanvas(myWidth, myHeight, WEBGL);
    myCanvas.parent("#canvas");

    // styling
    strokeWeight(1.5);
    ellipseMode(CENTER);
    noFill();

    // start
    initialize();
    permUnit = unitCircle;
    permNew = newCoords;
    permInv = invCoords;
    count0 = count;
    drawing();
}

function initialize() {
    // create Coords
    unitCircle = new Coords();
    for (i = 0; i < count; i++) {
        amount = map(i,0,count,0,2*PI);
        unitCircle.x[i] = scalar*cos(amount);
        unitCircle.y[i] = scalar*sin(amount);
    }
    newCoords = new Coords();
    invCoords = new Coords();
    setPoints();
    drawing();
}

function setPoints() {
    // shift
    eigenvecs = [2.2,-2,2,12];
    eigenvals = [4,0,0,1];
    // eigenvals[3] = ((frameCount)%200*0.01) + 1;

    // calculate matrices
    myMatrix = matrixMult(eigenvecs,matrixMult(eigenvals,matrixInv(eigenvecs)));
    inv = matrixInv(myMatrix);
    deg1 = atan(eigenvecs[2]/eigenvecs[0]);
    deg2 = atan(eigenvecs[3]/eigenvecs[1]);

    // add transformed to coords
    for (i = 0; i < count; i += 2) {
        newCoords.x[i] = myMatrix[0]*unitCircle.x[i] + myMatrix[1]*unitCircle.y[i];
        newCoords.y[i] = myMatrix[2]*unitCircle.x[i] + myMatrix[3]*unitCircle.y[i];
        invCoords.x[i] = inv[0]*unitCircle.x[i] + inv[1]*unitCircle.y[i];
        invCoords.y[i] = inv[2]*unitCircle.x[i] + inv[3]*unitCircle.y[i];
    }
}

function drawing() {
    background(0, 0, 30);
    timer = 0;

    // BLUE ORIGINAL
    if (varOrig.querySelector(".checkLine").checked) {
        stroke(0, 0, 250);
        for (i = 0; i < count; i += 2) {
            vector(unitCircle.x[i],unitCircle.y[i]); // original
            vector(newCoords.x[i],newCoords.y[i],unitCircle.x[i],unitCircle.y[i]); // to displacement
        }
    }
    if (varOrig.querySelector(".checkCir").checked) {
        stroke(0, 0, 250);
        ellipse(0,0,2*scalar,2*scalar,min(count0,50)); // ellipse
    }

    // GREEN NEW
    if (varNew.querySelector(".checkLine").checked) {
        stroke(200, 255, 30);
        push();
            fill(200, 255, 30);
            for (i = 0; i < count; i += 2) {
                vector(newCoords.x[i],newCoords.y[i],-1*newCoords.x[i],-1*newCoords.y[i]);
                // vector(newCoords.x[i],newCoords.y[i]); // lines
                ellipse(newCoords.x[i],-1*newCoords.y[i],6); // dots
            }
        pop();
    }
    if (varNew.querySelector(".checkCir").checked) {
        stroke(200, 255, 30);
        beginShape();
        for (i = 0; i < count0; i += 2) { vertex(permNew.x[i],-1*permNew.y[i]); } // ellipse
        endShape(CLOSE);
    }

    // PINK INVERSE
    if (varInv.querySelector(".checkLine").checked) {
        stroke(200, 0, 100);
        for (i = 0; i < count; i += 2) { vector(invCoords.x[i],invCoords.y[i],unitCircle.x[i],unitCircle.y[i]); } // lines
    }
    if (varInv.querySelector(".checkCir").checked) {
        stroke(200, 0, 100);
        beginShape();
        for (i = 0; i < count0; i += 2) { vertex(permInv.x[i],-1*permInv.y[i]); } // ellipse
        endShape(CLOSE);
    }

    // WHITE EIGENS
    if (varEigs.querySelector(".checkLine").checked) {
        stroke(255);
        push();
            strokeWeight(6);
            vector(eigenvals[0]*cos(deg1)*scalar,eigenvals[0]*sin(deg1)*scalar);
            vector(eigenvals[3]*cos(deg2)*scalar,eigenvals[3]*sin(deg2)*scalar);
        pop();
    }
}

// ----------------------------------------------------------------------------------------------------------------
// OTHER FUNCTIONS & CLASSES

function vector(x, y, x0 = 0, y0 = 0) {
    // draws line from (x0,y0) (center of canvas by default) to (x,y)
    line(x0,-1*y0,x,-1*y);
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

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
    drawing();
}

class Coords {
    constructor() {
        this.x = [];
        this.y = [];
    }
}