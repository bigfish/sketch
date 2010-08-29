/*jslint evil: true*/

function Sketch(canvasID) {

    var ctx;
    var canvas_left;
    var canvas_top;
    var drawing = false;
    var path = []; //array of points
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
        path.push( { x: x, y: y, c: MOVE_TO});
        ctx.moveTo(x, y);
    }

    function drawLine(x, y) {
        path.push( { x: x, y: y, c: LINE_TO});
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
                if (console && console.log) {
                }
            }
        }
        ctx.stroke();
    }

    function endLine(x, y) {
        drawLine(x, y);
        drawing = false;
    }

    function onMouseDown(e) {
        startLine(e.pageX - canvas_left, e.pageY - canvas_top);
    }

    function onMouseUp(e) {
        endLine(e.pageX - canvas_left, e.pageY - canvas_top);
    }

    function onMouseMove(e) {
        if (drawing) {
            drawLine(e.pageX - canvas_left, e.pageY - canvas_top);
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
        canvas_left = $(canvas).position().left;
        canvas_top = $(canvas).position().top;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;

        $(canvas).mousedown(onMouseDown);
        $(canvas).mouseup(onMouseUp);
        $(canvas).mousemove(onMouseMove);

    }

    function getData() {
        //return as array of point objects
        return path;
    }

    function getJSON() {
        //return as JSON string
        var jsonArr = [];
        var point;
        for (var p = 0; p < path.length; p++) {
            point = path[p];
            jsonArr.push('{"x":' + point.x + ',"y":' + point.y + ',"c":' + point.c + '}');
        }
        return "["+jsonArr.join(",")+"]";
    }

    function setData(pathData) {
        clear();
        path = pathData;
        drawPath();
    }

    function loadJSON(json) {
        if(json){
            clear();
            try {
                path = eval(json);
            } catch(e) {
                alert("error parsing json -- please check with jslint");
            }
            drawPath();
        }
    }

    init(canvasID);

    this.clear = clear;
    this.getData = getData;
    this.setData = setData;
    this.getJSON = getJSON;
    this.loadJSON = loadJSON;

}

