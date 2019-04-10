window.addEventListener('load', function () {
	Crafty.init(700, 500);
	Crafty.background('url(assets/home-background.gif) no-repeat');
	$('#cr-stage').css('background-size', 'cover');
	Crafty.e("2D, DOM, Image").attr({x: 25, y: 75}).image("assets/title.png");
	$('#ent1').css('background-size', '650px');
	$('#players').append('<input class="input" type="text" name="player1" placeholder="Player 1" required>');
	$('#players').append('<input class="input" type="text" name="player2" placeholder="Player 2" required>');
});


// var leftButton = Crafty.e("2D, DOM, Mouse")
//    .bind('Click', function(MouseEvent){
// 	  alert('clicked', MouseEvent);
// 	});

var addtlPlayerInput = function () {
	var numPlayers = $('input').length + 1;
	$('#players').append($('<input class="input" type="text" name="player'+ numPlayers + '" placeholder="Player ' + numPlayers+ '">'));
	if (numPlayers == 6) {
		$('#addp').hide();
	}
	return false;
}