// init
// globals.map.forEach((rule)=> {
// 	var shape = rule.shape;
// 	var shapePath = importJSON(rule.shape);
// });

var path;
var rendered = [];
var rendered2 = [];

var textItem = new PointText({
	content: 'Draw a new shape:',
	point: new Point(20, 30),
	fillColor: 'black',
});

var textItem2 = new PointText({
	content: 'Rule:',
	point: new Point(20, 230),
	fillColor: 'black',
});

function onMouseDown(event) {	
	// If we produced a path before, deselect it:
	if (path) {
		path.selected = false;
	}


	// Create a new path and set its stroke color to black:
	path = new Path({
		segments: [event.point],
		strokeColor: new Color(Math.random(), Math.random(), Math.random()),
		strokeWidth: 5
	});
	hello(globals.map);
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
	console.log('why u drawing');
	path.add(event.point);

	// Update the content of the text item to show how many
	// segments it has:
	textItem.content = '';
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
	// When the mouse is released, simplify it:
	path.simplify(10);
	path.closed = true;
	console.log('path', path.exportJSON());
	globals.createdShape(path.exportJSON());
}

function hello(shapes) {
  for(var i=0; i<shapes.length; i++) {
    var p = new Path();
    p =  paper.importJSON(shapes[i].shape);
    rendered.push(p);
    rendered[i].closed = true;
    q = new Path({
		segments: rendered[i].segments,
		strokeColor: rendered[i].strokeColor,
		strokeWidth: 5
	});
  }
  console.log(rendered);
}

setTimeout(function () {
	console.log('globals', globals);
    hello(globals.map);
    if (globals.state == "turn") {
    	movePoint();
    }
}, 100);

function movePoint() {
		// take turn
	var landingX = Math.random()*650;
	var landingY = Math.random()*450;
	var point = new Point(landingX, landingY);
	var pointCircle = new Path.Circle();
	
	setTimeout(function () {
		pointCircle = new Path.Circle({center: new Point({x: landingX-50, y: landingY-50}), radius: 30, strokeColor: new Color(1, 0, 0)});
		console.log('oc', pointCircle, landingX, landingY);
		setTimeout(function () {
				pointCircle = new Path.Circle({center: new Point({x: landingX-20, y: landingY-20}), radius: 20, strokeColor: new Color(1, 0, 0)});
		console.log('oc', pointCircle, landingX, landingY);
				setTimeout(function () {
				pointCircle = new Path.Circle({center: new Point({x: landingX, y: landingY}), radius: 10, strokeColor: new Color(1, 0, 0)});
		console.log('oc', pointCircle, landingX, landingY);

				}, 1000);
			}, 1000);
	}, 1000);
	globals.map.forEach(function (rule) {
		// if landing coords inside rule shape
		// then show rule, a button that says "DONE"
		// will appear but be disabled for a few seconds alongside a timer
		console.log('before');
		var shape = paper.importJSON(rule.shape);
		console.log('shape', shape);
		console.log('intersects', shape.contains(point));
	});
}