function Drawing(canvasID) {

    var ctx;
    var canvas_x, canvas_y;
    var canvas_pos;
    var line_start;
    var drawing = false;
    var path = []; //array points
    var mode = "linear"; //draw points whenever mouse moves
    //var mode = "continuous";//draw points whenever mouse moves
    
    function getElementPosition(obj) {
        var curleft = 0,
        curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
                obj = obj.offsetParent;
            } while (obj);
        }
        return {
            x: curleft,
            y: curtop
        };
    }

    function clearScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function startLine(x, y) {
        drawing = true;
        ctx.beginPath();
        line_start = {
            x: x,
            y: y
        };
        ctx.moveTo(x, y);
    }

    function drawPath() {
        clearScreen();
        if (path.length === 0) {
            return;
        }
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (var p = 0; p < path.length; p++) {
            ctx.lineTo(path[p].x, path[p].y);
        }
        ctx.stroke();
    }

    function drawLine(x, y) {
        if (mode == "continuous") {
            //add a line segment to the current point
            ctx.lineTo(x, y);
            ctx.stroke();
            path.push({
                x: x,
                y: y
            });

        } else if (mode == "linear") {
            //show where the next line will be drawn on mouse up
            //redraw existing lines
            clearScreen();
            ctx.beginPath();
            drawPath();
            //draw last line to current point
            ctx.lineTo(x, y);
            ctx.stroke();

        }
    }

    function endLine(x, y) {
        drawLine(x, y);
        //point will added in drawLine if mode is continuous
        if (mode == "linear") {
            path.push({
                x: x,
                y: y
            });
        }
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

        canvas_pos = getElementPosition(canvas);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mousemove", onMouseMove);

    }

    init(canvasID);

}

