/*jslint evil: true*/

function Point(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
}

Point.prototype.toString = function () {
    return '{"x":' + this.x + ',"y":' + this.y + ',"c":' + this.c + '}';
};

function Drawing(canvasID) {

    var ctx;
    var drawing = false;
    var path = []; //array points
    var MOVE_TO = 0;
    var LINE_TO = 1;

    function clearScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function clear() {
        clearScreen();
        path = [];
    }

    function startLine(x, y) {
        drawing = true;
        ctx.beginPath();
        path.push(new Point(x, y, MOVE_TO));
        ctx.moveTo(x, y);
    }

    function drawLine(x, y) {
        path.push(new Point(x, y, LINE_TO));
        clearScreen();
        drawPath();
    }

    function drawPath() {
        var point;
        if (path.length === 0) {
            return;
        }
        ctx.beginPath();
        for (var p = 0; p < path.length; p++) {

            point = path[p];

            if (point.c == MOVE_TO) {
                ctx.moveTo(point.x, point.y);

            } else if (point.c == LINE_TO) {
                ctx.lineTo(point.x, point.y);

            } else {
                console.log("unknown command");
            }
        }
        ctx.stroke();
    }

    function endLine(x, y) {
        drawLine(x, y);
        drawing = false;
    }

    function onMouseDown(e) {
        startLine(e.offsetX, e.offsetY);
    }

    function onMouseUp(e) {
        endLine(e.offsetX, e.offsetY);
    }

    function onMouseMove(e) {
        if (drawing) {
            drawLine(e.offsetX, e.offsetY);
        }
    }

    function init(canvasID) {

        if (typeof canvasID !== "string") {
            alert("Drawing requires id of canvas element as parameter");
            return;
        }

        canvas = document.getElementById(canvasID);

        if (!canvas) {
            alert("Drawing was not able to find a canvas element with ID == ".canvasID);
        }

        try {
            ctx = canvas.getContext("2d");
        } catch(e) {
            alert("Drawing was unable to initialize. Most likely you browser does not support Canvas");
            return;
        }

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 0;

        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mousemove", onMouseMove);

    }

    function getData() {
        //return as array of point objects
        return path;
    }

    function getJSON() {
        //return as JSON string
        return "[" + path + "]";
    }

    function setData(pathData) {
        clear();
        path = pathData;
        drawPath();
    }

    function loadJSON(json) {
        clear();
        path = eval(json);
        drawPath();
    }

    init(canvasID);

    this.clear = clear;
    this.getData = getData;
    this.setData = setData;
    this.getJSON = getJSON;
    this.loadJSON = loadJSON;

}

