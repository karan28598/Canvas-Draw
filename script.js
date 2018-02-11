var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var mouse = {
    x: 0,
    y: 0
};
var last_mouse = {
    x: 0,
    y: 0
};

var outputcanvas = document.getElementById('canvasout');
var pencol = document.getElementById('pen-color');
var penwid = document.getElementById('pen-width');

var drawup = false;
var drawcolor = 'black';
var drawwidth = penwid.value;



pencol.addEventListener('change', fcolor);
penwid.addEventListener('change', fwidth);

document.getElementById('xsave').addEventListener("click", fsave);
document.getElementById('xclear').addEventListener("click", fclear);

canvas.addEventListener('mousemove', function (e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    draw('move');
}, false);

canvas.addEventListener('mousedown', function (e) {
    draw('down');
}, false);

canvas.addEventListener('mouseup', function (e) {
    draw('up');
}, false);

canvas.addEventListener('mouseout', function (e) {
    draw('up');
}, false);



function draw(a) {
    if (a == 'down') {
        drawup = true;
    }
    if (a == 'up') {
        drawup = false;
    }
    if (drawup) {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);

        ctx.strokeStyle = drawcolor;
        ctx.lineWidth = drawwidth;

        ctx.stroke();
        ctx.closePath();
    }


}

function fcolor() {
    drawcolor = pencol.value;
}

function fwidth() {
    drawwidth = penwid.value;
}

function fsave() {
    var dataURL = canvas.toDataURL();
    outputcanvas.src = dataURL;
    outputcanvas.style.display = 'inline';  
}

function fclear() {
    var flag = confirm("Clear Everything?");
    if (flag) {
        ctx.clearRect(0, 0, w, h);
        outputcanvas.style.display = 'none';
    }
}