var dimen;
var eigenvecs;
var eigenvals;
var matrix;
var inv;
var xs;
var ys;
var grad;
var scalar;
var timer;
var x0;
var y0;

function setup() {
    let myCanvas = createCanvas(windowWidth,windowHeight);
    myCanvas.parent("big");

    everything();
}

function everything() {
    x0 = windowWidth/2;
    y0 = windowHeight;
    timer = 0;

    // construct matrices
    eigenvecs = [2.2,-2,2,12];
    eigenvals = [4,0,0,20];

    //construct circle coordinates
    scalar = min(windowWidth,windowHeight)*2/5;
    xs = [];
    ys = [];
    for (i = 0; i < 200; i++) {
    amount = map(i,0,200,0,2*PI);
    xs[i] = scalar*cos(amount);
    ys[i] = scalar*sin(amount);
    }

    background(0, 0, 30);

    eigenvals[3] = ((frameCount)%200*0.01) + 1;

    matrix = matrixMult(eigenvecs,matrixMult(eigenvals,matrixInv(eigenvecs)));
    print(matrix);
    inv = matrixInv(matrix);

    // blue (original/displacement)
    stroke(0, 0, 200);
    for (i = 0; i < 360; i += 2) {
        vector(xs[i],-1*ys[i]);
        xnew = matrix[0]*xs[i] + matrix[1]*ys[i];
        ynew = matrix[2]*xs[i] + matrix[3]*ys[i];
        line(xs[i]+x0,-1*ys[i]+y0,xnew+x0,-1*ynew+y0);
    }

    // green (new)
    stroke(200, 255, 30);
    for (i = 0; i < 360; i += 2) {
        xnew = matrix[0]*xs[i] + matrix[1]*ys[i];
        ynew = matrix[2]*xs[i] + matrix[3]*ys[i];
        vector(xnew,ynew);
    }

    // pink (inverse)
    for (i = 0; i < 360; i += 2) {
     xnew = inv[0]*xs[i] + inv[1]*ys[i];
     ynew = inv[2]*xs[i] + inv[3]*ys[i];
     stroke(200, 0, 100);
     line(xs[i]+x0,-1*ys[i]+y0,xnew+x0,-1*ynew+y0);
    }

    //eigenvectors
    // push();
    // strokeWeight(10);
    // stroke(255);
    // deg1 = atan(eigenvecs[2]/eigenvecs[0]);
    // deg2 = atan(eigenvecs[3]/eigenvecs[1]);

    // vector(eigenvals[0]*cos(deg1)*scalar,eigenvals[0]*sin(deg1)*scalar);
    // vector(eigenvals[3]*cos(deg2)*scalar,eigenvals[3]*sin(deg2)*scalar);
    // pop();
}

function vector(x, y) {
    // draws line from center of canvas to given po(x,y)
    line(x0,y0,x0+x,y0-y);
}

function matrixInv(mat) {
    // calculates inverse of a 2x2 nonsingular matrix
    inv = [];
    det = mat[0]*mat[3] - mat[1]*mat[2];
    inv[0] = mat[3]/det;
    inv[3] = mat[0]/det;
    inv[1] = -1*mat[1]/det;
    inv[2] = -1*mat[2]/det;
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
    everything();
}