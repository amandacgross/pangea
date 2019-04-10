window.addEventListener('load', function () {
	Crafty.init(700, 500);
	Crafty.background('url(assets/game-skin.jpg) no-repeat');
	$('#cr-stage').css('background-size', '650px');
});

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