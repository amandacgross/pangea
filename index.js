const express = require('express');
const bodyParser = require('body-parser');
const Crafty = require('craftyjs');
const app = express();


const port = process.env.PORT || 8000;
const path = require ('path');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));


class Game {

	constructor(players) {
		this.players = players;
		this.rules = [];
		this.turn = 0;
	}


}

let game;

app.get('/', (req, res) => {

  res.render('home.ejs');
});

app.get('/startGame', (req, res) => {
	var players = [];
	Object.keys(req.query).forEach(function (key) {
		players.push(req.query[key]);
	});
	if (players.length > 0) {
		game = new Game(players);
		// send game info to DB
		res.render('game.ejs', {"players": players, "turn": 0});
	} else {
		res.redirect('/');
	}
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});