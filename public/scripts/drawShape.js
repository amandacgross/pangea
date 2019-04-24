var path;
var rendered = [];

var intersects = null;

function onMouseDown(event) {	
	if (!intersects) {
		// If we produced a path before, deselect it:
		if (path) {
			path.selected = false;
		}
		path = new Path({
			segments: [event.point],
			strokeColor: new Color(Math.random(), Math.random(), Math.random()),
			strokeWidth: 5
		});
		init(globals.map);
	}
	
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
	if (!intersects) {
		path.add(event.point);
	}
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
	// When the mouse is released, simplify it:
	path.simplify(10);
	path.closed = true;
	path.fillColor = path.strokeColor;
	console.log('path', path.exportJSON());
	globals.createdShape(path.exportJSON());
}

function init(shapes) {
  for(var i=0; i<shapes.length; i++) {
    var p = new Path();
    p =  paper.importJSON(shapes[i].shape);
    rendered.push(p);
    rendered[i].closed = true;
    q = new Path({
		segments: rendered[i].segments,
		strokeColor: rendered[i].strokeColor,
		strokeWidth: 5,
		fillColor: rendered[i].strokeColor
	});
  }
  console.log(rendered);
}

setTimeout(function () {
    init(globals.map);
    if (globals.state == "turn") {
    	movePoint();
    }
}, 100);

function displayResult(point) {
	globals.map.forEach(function (rule) {
		// if landing coords inside rule shape
		// then show rule, a button that says "DONE"
		// will appear but be disabled for a few seconds alongside a timer
		var shape = paper.importJSON(rule.shape);
		console.log('intersects', shape.contains(point));
		if (shape.contains(point)) {
			intersects = rule.text;
		}
	});
	if (intersects) {
		$('#rule').text('Your task is: ' + intersects);
		$('#done').attr("disabled", false);	
	} else {
		$('#rule').text('Make a rule:');
		$('#newText').show();
	}
}

function movePoint() {
	// take turn
	var landingX = Math.random()*325 + 60;
	var landingY = Math.random()*200 + 40;
	console.log(landingX, landingY);
	var point = new Point(landingX, landingY);
	var pointCircle = new Path.Circle();
	
	setTimeout(function () {
		pointCircle = new Path.Circle({center: new Point({x: landingX-50, y: landingY-50}), radius: 30, strokeColor: '#f4cb42', fillColor: '#f4cb42'});
		setTimeout(function () {
			pointCircle.remove();
			pointCircle = new Path.Circle({center: new Point({x: landingX-20, y: landingY-20}), radius: 20, strokeColor: '#f4cb42', fillColor: '#f4cb42'});
			setTimeout(function () {
			pointCircle.remove();
			pointCircle = new Path.Circle({center: new Point({x: landingX, y: landingY}), radius: 10, strokeColor: '#f4cb42', fillColor: '#f4cb42'});
				displayResult(point);
			}, 1000);
		}, 1000);
	}, 1000);

}