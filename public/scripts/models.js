const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pangea');

const { Schema } = mongoose;

const ruleSchema = new Schema({
  shape: { type: String, required: true },  // not sure how to store the shape yet
  text: { type: String, required: true },
});

const gameSchema = new Schema({
  players: { type: [String], required: true }, // author ids
  turn: { type: String, required: true},       // player who's turn it is
  map: [ruleSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Game', gameSchema);