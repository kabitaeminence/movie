const mongoose = require("mongoose");

const validator = require("validator");
const Schema = mongoose.Schema;

const shows = new mongoose.Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },

  start_time: {
    type: String,
  },

  end_Time: {
    type: String,
  },
  bookingDate: {
    type: Date,
  },
});
const Shows = mongoose.model("Shows", shows);
module.exports = Shows;
