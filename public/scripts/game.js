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
	$('#rule').text('');
	$('#newText').hide();
	$( "#newText" ).keypress(function(event) {
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