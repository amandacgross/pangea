var globals = {'createdShape': function(shape) {
	console.log('newShape', shape);
	newShape = shape;
	$('#newShape').val(shape.toString());
	if ($('#newText').val()) {
		$('#done').attr("disabled", false);	
	}
	
}};
var newShape;

window.addEventListener('load', function () {
	// Crafty.init(700, 500);
	// Crafty.background('url(assets/game-skin.jpg) no-repeat');
	// $('#cr-stage').css('background-size', '650px');
	$( "#newText" ).keypress(function(event) {
	  console.log( "Handler for .keypress() called." );
	  if (newShape && $('#newText').val() != '') {
	  	$('#done').attr("disabled", false);	
	  } else {
	  	$('#done').attr("disabled", true);	
	  }
	});
	$( "#newText" ).change(function(event) {
	  console.log( "Handler for .keypress() called." );
	  if (newShape && $('#newText').val() != '') {
	  	$('#done').attr("disabled", false);	
	  } else {
	  	$('#done').attr("disabled", true);	
	  }
	});
});

function setGlobals(s, m) {
	globals.state = s;
	globals.map = m;
	console.log('s m', s, m);
	// if (state == "start") {
	// 	myView.scale(.01);
	// 	globals.countdown = 100;
	// } else {
	// 	$('#myCanvas').css({
 //        width: 400;
 //        height: 250;
 //        position:absolute;
 //        bottom:0;
 //        right:0;
 //      });
	// }
}


var tableCoords = {
	0: [150, 25],
	1: [490, 25],
	2: [575, 150],
	3: [490, 330],
	4: [150, 330],
	5: [25, 150]
}

var flashTurn = function(id) {
	var player = $('#player' + id);
	setInterval(function() {
        player.toggle('slow');
    }, 1000);
}

var createdShape = function(shape) {
	console.log('newShape', shape);
	newShape = shape;
	$('#newShape').val(shape.toString());
	if ($('#newText').val() != '') {
		$('#done').attr("disabled", false);	
	}
	
}

var displayPlayers = function (players, turn) {
	var j = Math.min(players.length, 6);
	for (var i=0; i<j; i++) {
		var playerName = $('<p></p>').text(players[i]);
		playerName.attr('id', 'player' + i);
		playerName.css('top', tableCoords[i][1]);
		playerName.css('left', tableCoords[i][0]);
		$('#game').append(playerName);
	}

	flashTurn(turn);
}