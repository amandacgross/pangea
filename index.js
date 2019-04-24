const express = require('express');
const bodyParser = require('body-parser');
const Crafty = require('craftyjs');
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const port = process.env.PORT || 8000;
const path = require ('path');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));

var mongoose = require('mongoose');
var GameModel = require('./public/scripts/models.js');

const paper = require('paper');
paper.setup();

class Game {

	constructor(id, players, map, turn) {
		this.id = id;
		this.players = players;
		if (map) {
			this.map = [];
			map.forEach((rule) => {
				var parsedShape = rule.shape;//paper.importJSON(rule.shape);
				this.map.push({
					text:rule.text,
					shape:parsedShape
				});
			});
		} else {
			this.map = [];	
		}
		if (turn) {
			this.turn = turn;
		} else {
			this.turn = 0;
		}
		
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
		var newGame = new GameModel({ players: players, turn:0 });
		newGame.save(function (err, result) {
		    if (!err) {
		    	game = new Game(result._id, players);
		      	res.render('game.ejs', {"players": players, "turn": 0, "state": "start"});
		    } else {
		      next(err);
		    }
		});
		
	} else {
		res.redirect('/');
	}
});

app.get('/loadGame', (req, res) => {
	GameModel.find({}, function (err, games) {
	    if (!err) {
	    	let gamesList = [];
	    	games.forEach(function (gameObj) {
	    		gamesList.push({
	    			'id': gameObj._id,
	    			'players': gameObj.players.toString(),
	    			'date': gameObj.updatedAt
	    		});
	    	});
	    	res.render('gamesList.ejs', { games: gamesList });
	    } else {
	    	next(err);
	    }
    });
})

app.post('/loadGame', (req, res) => {
	GameModel.findOne({'_id': req.body.selectedGame}, function (err, gameObj) {
		if (!err && gameObj) {
			game = new Game(gameObj._id, gameObj.players, gameObj.map, gameObj.turn);
			console.log('map', game.map);
			res.render('game.ejs', {"players": game.players, "map": game.map, "turn": game.turn, "state": "start"});
		} else {
			next(err);
		}
	})
})

// we will have a button that first says "GO" and will do the first person's turn


// the button will change to "NEXT" and when it is clicked it will call /turn

// app.get('/makeRule', (req, res) => {
// 	// a card that allows you to write a rule will appear and then you can click "DONE"

// });

app.post('/makeRule', (req, res) => {
	game.map.push({
          shape: req.body.newShape,
          text: req.body.ruleText,
    });
	GameModel.update({ _id: game.id }, {
    $set:
    {
      map: game.map
    },
  }, (err, game) => {
    if (err) {
      res.next(err);
    } else {
      // slow animation starts immediately
      res.redirect('/turn');
    }
  });
	
});


app.get('/turn', (req, res) => {

	// if this section is reached, landing coords are in blank spot
	res.render('game.ejs', {"players": game.players, "map": game.map, "turn": game.turn, "state": "turn"});
	//res.redirect('/makeRule');
});


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});