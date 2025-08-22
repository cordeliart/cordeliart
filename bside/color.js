var mainDiv = document.getElementById('main');
var count = 50;
var scaleX = (window.innerWidth-48)/count;
var scaleY = (window.innerHeight-96)/count;
var square = String(min(scaleX,scaleY)*.8) + 'px';
var slider = document.getElementById('lightness');
var l = lightness.value * 100;
var val = document.getElementById('sliderVal');
var boxes = document.getElementById('boxCount');

window.onload = (event) => {
    redraw();
}

function redraw() {
    mainDiv.innerHTML = '';
    for (let i = 1; i <= count; i++) {
        var newRow = document.createElement('div');
        newRow.setAttribute('style','display:flex;flex-flow:row nowrap; width: 100%;height: auto;justify-content:center;')
        for (let j = 1; j <= count; j++) {
            var newDiv = document.createElement('div');
            newDiv.setAttribute("style","display:block;width:scaleX;height:scaleY;background-color:red;");
            newDiv.style.display = 'block';
            newDiv.style.width = square;
            newDiv.style.height = square;
            newDiv.style.backgroundColor = 'oklch(' + String(l) + '% ' + String(map(i,count,0,.4)) + ' ' + String(map(j,count,0,360));
            newRow.appendChild(newDiv);
        }
        mainDiv.appendChild(newRow);
    }
    val.innerHtml = l;
}

slider.oninput = function() {
    l = slider.value * 100;
    redraw();
}

boxes.oninput = function () {
    count = boxes.value;
    scaleX = (window.innerWidth-16)/count;
    scaleY = (window.innerHeight-64)/count;
    square = String(min(scaleX,scaleY)*.8) + 'px';
    redraw();
}

function map(a,b,x,y) {
    return a/b*y;
}

function min(a,b) {
    if (a > b) {
        return b;
    } else {
        return a;
    }
}