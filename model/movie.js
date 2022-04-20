const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const movie = new mongoose.Schema({
  movieName: {
    type: String,
  },
  seatsNumber: {
    type: Number,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});
const Movie = mongoose.model("Movie", movie);
module.exports = Movie;
