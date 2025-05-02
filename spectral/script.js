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
var scrollSections = body.querySelectorAll(".snapscroll");
var labels = body.querySelectorAll(".label"), firstClick = 0;

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
            for(var iRemove = 0; iRemove < section.dotCount; iRemove++) {
                section.dots[iRemove].classList.remove("circled");
            }
            console.log(adot.num);
            section.activeId = adot.num;
            // console.log(section.adot.num);
            // clear old
            // for(var j = 0; j < section.dotCount; j++) {
            //     section.dots[j].classList.remove("circled");
            // }
            document.getElementById(adot.num+1).scrollIntoView({behavior: "smooth", block: "center"});
            // // switch to new
            section.dots[section.activeId].classList.add("circled");
        })
    })

    // SCROLL DIRECTION
    section.addEventListener("scroll", () => {})
    
    // CHECK SCROLL
    section.addEventListener("scrollsnapchange", (event) =>{
        for(var iRemove = 0; iRemove < section.dotCount; iRemove++) {
            section.dots[iRemove].classList.remove("circled");
        }
        newId = event.snapTargetBlock.id-1;
        if (newId > section.activeId && section.activeId < section.dotCount) { section.activeId += 1; } // SCROLL DOWN
        if (newId < section.activeId && section.activeId >= 1 ) { section.activeId -= 1; } // SCROLL UP
        section.dots[section.activeId].classList.add("circled");
    })
})

minimizer.addEventListener("click", () =>{
    menu.classList.toggle("hidden");
    minimizer.classList.toggle("minhover");
})
menuBasics.addEventListener("click", () =>{
    if (menu.classList.contains("full")) {
        menu.classList.remove("full");
    }
    menu.classList.add("hidden");
    mbasics.classList.add("selected");
    mmatrix.classList.remove("selected");
    minteract.classList.remove("selected");
    minimizer.classList.add("minhover");
    labels.forEach(element => {
        element.style.display = "none";
    })
})
function nexter() {
    mbasics.classList.remove("selected");
    mmatrix.classList.add("selected");
    minteract.classList.remove("selected");
    window.scrollTo({top: 0, behavior: "instant"});
    minimizer.classList.add("minhover");
}
menuMatrix.addEventListener("click", () =>{
    if (menu.classList.contains("full")) {
        menu.classList.remove("full");
    }
    menu.classList.add("hidden");
    mbasics.classList.remove("selected");
    mmatrix.classList.add("selected");
    minteract.classList.remove("selected");    
    minimizer.classList.add("minhover");
    labels.forEach(element => {
        element.style.display = "none";
    })
})
function nexter1() {
    mbasics.classList.remove("selected");
    mmatrix.classList.remove("selected");
    minteract.classList.add("selected");
    window.scrollTo({top: 0, behavior: "instant"});
    minimizer.classList.add("minhover");
}
menuInteract.addEventListener("click", () =>{
    if (menu.classList.contains("full")) {
        menu.classList.remove("full");
    }
    menu.classList.add("hidden");
    mbasics.classList.remove("selected");
    mmatrix.classList.remove("selected");
    minteract.classList.add("selected");
    labels.forEach(element => {
        element.style.display = "none";
    })
})

// INTERACT POPUP

const popup = body.querySelector(".popup"),
    opener = body.querySelector(".tips"),
    closer = body.querySelector("#close"),
    popupbg = body.querySelector(".popupbg");

opener.addEventListener("click", () =>{
    popup.style.display = "flex";
    opener.style.opacity = "20%";
    popupbg.style.display = "block";
})
closer.addEventListener("click", () =>{
    popup.style.display = "none";
    opener.style.opacity = "100%";
    popupbg.style.display = "none";
})

// INTERACT -------------------------

var varOrig = document.getElementById("varOrig"),
    varNew = document.getElementById("varNew"),
    varInv = document.getElementById("varInv"),
    varEigs = document.getElementById("varEigs"),
    showCircles = document.getElementById("col1"),
    showLines = document.getElementById("col2");
var checks = [varOrig, varNew, varInv, varEigs];

var eigenvecs, eigenvals, deg1, deg2, // eigenstuff
    myMatrix, inv, // matrices
    scalar, count0, // unit circle stuff
    myHeight, myWidth, // dimensions
    unitCircle, newCoords, invCoords,
    permUnit, permNew, permInv; // COORD CLASS INSTANCES

var eig1x, eig2x, eig1y, eig2y, drag1, drag2;
var myFont;

function sketchInt(p) {

    // ----------------------------------------------------------------------------------------------------------------
    // MENU CHECKBOXES

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
        p.drawing();
    })
    
    // ----------------------------------------------------------------------------------------------------------------
    // SLIDER
    
    var slider = document.getElementById("lineCount"),
        count = slider.value;
    p.setup = function () {
        // canvas
        myHeight = p.windowHeight;
        myWidth = p.windowWidth;
        scalar = p.min(myWidth,myHeight)*.15;
        p.myCanvas = p.createCanvas(myWidth, myHeight, p.WEBGL);
        p.myCanvas.position(0,0);
        p.myCanvas.parent("#canvasInt");
    
        // styling
        p.strokeWeight(1);
        p.ellipseMode(p.CENTER);
        p.noFill();
    
        // start
        eig1x = 3*scalar;
        eig1y = 1.2*scalar;
        eig2x = .3*scalar;
        eig2y = .7*scalar;
        eigenvals = [0,0,0,0];

        unitCircle = new Coords();
        for (i = 0; i < count; i++) {
            amount = i/count*2*p.PI;
            unitCircle.x[i] = scalar*p.cos(amount);
            unitCircle.y[i] = scalar*p.sin(amount);
        }

        count0 = count;
        p.recalc();
    }
    slider.oninput = function(){
        count = 2*Math.round(slider.value/2);

        unitCircle = new Coords();
        for (i = 0; i < count; i++) {
            amount = i/count*2*p.PI;
            unitCircle.x[i] = scalar*p.cos(amount);
            unitCircle.y[i] = scalar*p.sin(amount);
        }
        p.recalc();
    }

    // ----------------------------------------------------------------------------------------------------------------
    // MAIN FUNCTIONS

    p.recalc = function() {
        newCoords = new Coords();
        invCoords = new Coords();

        // calc scalars and normalize
        eigenvals[0] = norm([eig1x/scalar,eig1y/scalar]);
        eigenvals[3] = norm([eig2x/scalar,eig2y/scalar]);
        eigenvecs = [eig1x/scalar/eigenvals[0],eig2x/scalar/eigenvals[3],eig1y/scalar/eigenvals[0],eig2y/scalar/eigenvals[3]]

        myMatrix = matrixMult(eigenvecs,matrixMult(eigenvals,matrixInv(eigenvecs)));
        inv = matrixInv(myMatrix);
    
        // add transformed to coords
        for (i = 0; i < count; i += 2) {
            newCoords.x[i] = myMatrix[0]*unitCircle.x[i] + myMatrix[1]*unitCircle.y[i];
            newCoords.y[i] = myMatrix[2]*unitCircle.x[i] + myMatrix[3]*unitCircle.y[i];
            invCoords.x[i] = inv[0]*unitCircle.x[i] + inv[1]*unitCircle.y[i];
            invCoords.y[i] = inv[2]*unitCircle.x[i] + inv[3]*unitCircle.y[i];
        }
        
        var updateLines = document.getElementById("numLines");
        updateLines.innerHTML = "# of lines: "+String(count);
        
        var updateMat = document.getElementById("intMat");
        updateMat.innerHTML = "$$\\small{\\begin{bmatrix}"+String(Math.round(myMatrix[0]*100)/100)+"&"+String(Math.round(myMatrix[1]*100)/100)+"\\\\"+String(Math.round(myMatrix[2]*100)/100)+"&"+String(Math.round(myMatrix[3]*100)/100)+"\\end{bmatrix}}$$";
        MathJax.typesetPromise([updateMat]).then(() => {});

        var updateEigs1 = document.getElementById("intEigs1");
        updateEigs1.innerHTML = "$$\\scriptsize{\\lambda_1="+String(Math.round(eigenvals[0]*100)/100)+", u_1 = \\langle "+String(Math.round(eigenvecs[0]*100)/100)+", "+String(Math.round(eigenvecs[2]*100)/100)+"\\rangle}$$";
        MathJax.typesetPromise([updateEigs1]).then(() => {});

        var updateEigs2 = document.getElementById("intEigs2");
        updateEigs2.innerHTML = "$$\\scriptsize{\\lambda_2="+String(Math.round(eigenvals[3]*100)/100)+", u_2 = \\langle "+String(Math.round(eigenvecs[1]*100)/100)+", "+String(Math.round(eigenvecs[3]*100)/100)+"\\rangle}$$";
        MathJax.typesetPromise([updateEigs2]).then(() => {});

        p.drawing();
    }
    
    p.drawing = function () {
        p.background(0,0,8);
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
                for (i = 0; i < count/2; i += 1) {
                    vector(newCoords.x[i],newCoords.y[i]);
                    vector(-1*newCoords.x[i],-1*newCoords.y[i]); // lines
                    p.ellipse(newCoords.x[i],-1*newCoords.y[i],6); // dots
                    p.ellipse(-1*newCoords.x[i],newCoords.y[i],6); // dots
                }
            p.pop();
        }
        if (varNew.querySelector(".checkCir").checked) {
            p.stroke(222,255,35);
            p.beginShape();
            for (i = 0; i < count; i += 2) { p.vertex(newCoords.x[i],-1*newCoords.y[i]); } // ellipse
            p.endShape(p.CLOSE);
        }
    
        // WHITE INVERSE
        if (varInv.querySelector(".checkLine").checked) {
            p.stroke(231,239,249);
            for (i = 0; i < count; i += 2) { vector(invCoords.x[i],invCoords.y[i],unitCircle.x[i],unitCircle.y[i]); } // lines
        }
        if (varInv.querySelector(".checkCir").checked) {
            p.stroke(231,239,249);
            p.beginShape();
            for (i = 0; i < count0; i += 2) { p.vertex(invCoords.x[i],-1*invCoords.y[i]); } // ellipse
            p.endShape(p.CLOSE);
            // 19,6,90
        }
    
        // EIGENVECTORS
        if (varEigs.querySelector(".checkCir").checked) {
            p.stroke(222,255,35);
            var len = 2*p.max( Math.sqrt(eig1x**2 + eig1y**2), Math.sqrt(eig2x**2 + eig2y**2) );
            p.ellipse(0,0,len,len,50);
        }
        if (varEigs.querySelector(".checkLine").checked) {
            p.stroke(222,255,35);
            p.push();
                p.fill(231,239,249);
                p.strokeWeight(4);
                vector(eig1x,eig1y);
                vector(eig2x,eig2y);
                p.ellipse(eig1x,-1*eig1y,16);
                p.ellipse(eig2x,-1*eig2y,16);
            p.pop();
        }
    }

    p.draw = function () {
        if (drag1) {
            eig1x = p.mouseX-myWidth/2;
            eig1y = -1*(p.mouseY-myHeight/2);
            p.recalc();
        }
        if (drag2) {
            eig2x = p.mouseX-myWidth/2;
            eig2y = -1*(p.mouseY-myHeight/2);
            p.recalc();
        }
    }

    p.mousePressed = function() {
        if (varEigs.querySelector(".checkLine").checked) {
            if (p.dist(eig1x,-1*eig1y,p.mouseX-myWidth/2,p.mouseY-myHeight/2) <= 20) {
                drag1 = true;
            }
            if (p.dist(eig2x,-1*eig2y,p.mouseX-myWidth/2,p.mouseY-myHeight/2) <= 20) {
                drag2 = true;
            }
        }
    }
    p.mouseReleased = function() {
        drag1 = false;
        drag2 = false;
    }
    norm = function(vec) {
        var norm = 0;
        for (i = 0; i < 2; i ++) {
            norm += vec[i]**2;
        }
        return norm**.5;
    }
    function vector(x, y, x0 = 0, y0 = 0) {
        // draws line from (x0,y0) (center of canvas by default) to (x,y)
        p.line(x0,-1*y0,x,-1*y);
    }
    p.windowResized = function() {
        myHeight = p.windowHeight;
        myWidth = p.windowWidth;
        p.resizeCanvas(p.windowWidth,p.windowHeight);
        // scalar = p.min(myWidth,myHeight)*.15;
        p.recalc();
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

var x1, y1, clickCheck;

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
        p.textAlign(p.CENTER, p.CENTER);
        clickCheck = false;
    
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
        if (!clickCheck) { p.textSize(12); p.text("DRAG ME",x1,y1-15); }
        p.pop();

        if (p.dragging1) {
            x1 = p.mouseX;
            y1 = p.mouseY;
            replacer((x1-p.dimen/2)*4/(p.dimen),(y1-p.dimen/2)*(-6)/(p.dimen));
        }
    }

    p.mousePressed = function() {
        if (p.dist(x1,y1,p.mouseX,p.mouseY) < 15) { p.dragging1 = true; clickCheck = true;}
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
new p5(sketchVec1);