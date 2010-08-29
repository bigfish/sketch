##Sketch
###very simple line drawing with HTML5 Canvas

####Usage

		<!DOCTYPE HTML>
		<html>
		  <head>
			<title>Sketch</title>
			<script src="sketch.js" type="text/javascript" charset="utf-8"></script>
		  </head>
		  <body>
			<canvas id="canvas" width="640" height="640"></canvas>
			<script>
			  var sketch = new Sketch("canvas");
			</script>
		  </body>
		</html>

#### API

* Constructor takes ID of canvas element
* getData()  --> returns an Javascript array of Points
* setData(data) --> creates drawing using data returned from getData()
* getJSON --> gets JSON string for saving
* loadJSON --> creates drawing using JSON string from getJSON()

#### Demo
[http://www.dafishinsea.com/sketch/](http://www.dafishinsea.com/sketch/)

#### License
MIT -- see included LICENSE.txt file

	
