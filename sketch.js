/*jslint evil: true*/

function Sketch(canvasID) {

    var ctx;
    var canvas;
    var canvas_left;
    var canvas_top;
    var drawing = false;
    var path = []; 
    var commands = [];
    var MOVE_TO = 0;
    var LINE_TO = 1;

    function clearScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function clear() {
        clearScreen();
        path = [];
        commands = [];
    }

    function startLine(x, y) {
        drawing = true;
        ctx.beginPath();
        path.push(x, y);
        commands.push(MOVE_TO);
        ctx.moveTo(x, y);
    }

    function drawPath() {
        var point_x, point_y, command;

        if (path.length === 0) {
            return;
        }

        ctx.beginPath();

        for (var p = 0; p < path.length; p += 2) {

            point_x = path[p];
            point_y = path[p + 1];
            command = commands[Math.floor(p / 2)];

            if (command === MOVE_TO) {
                ctx.moveTo(point_x, point_y);

            } else if (command === LINE_TO) {
                ctx.lineTo(point_x, point_y);
            } else {
                console.log("unknown command");
            }
            ctx.stroke();
        }
    }

    function drawLine(x, y) {
        path.push(x, y);
        commands.push(LINE_TO);
        clearScreen();
        drawPath();
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
        } catch (e) {
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

    /**
     * Return array of points normalized to be between 0 & 1
     * @return {Array} 
     */
    function normalizePoints(points) {
        var point, normalArray = [];
        for (var p = 0; p < points.length; p += 2) {
            point = points[p];
            normalArray.push(points[p] / canvas.width, points[p + 1] / canvas.height);
        }
        return normalArray;
    }

    function getData(normalize) {
        //return as array of point objects
        if (normalize) {
            return normalizePoints(path);
        } else {
            return path;
        }
    }

    function getJSON(normalize) {

        var point, points;
        if (normalize) {
            points = normalizePoints(path);
        } else {
            points = path;
        }

        return '[[' + points + '], [' + commands + ']]';
    }

    function setData(pathData) {
        clear();
        path = pathData[0];
        commands = pathData[1];
        drawPath();
    }

    function loadJSON(json) {
        var pathData;
        if (json) {
            clear();
            try {
                pathData = eval(json);
            } catch (e) {
                alert("error parsing json -- please check with jslint");
            }
            setData(pathData);
        }
    }

    init(canvasID);

    this.clear = clear;
    this.getData = getData;
    this.setData = setData;
    this.getJSON = getJSON;
    this.loadJSON = loadJSON;

}

