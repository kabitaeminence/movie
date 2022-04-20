const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const Schema = mongoose.Schema;

const booking = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  showId: {
    type: Schema.Types.ObjectId,
    ref: "Shows",
  },

  status: {
    type: Number,
    enum: [1, 2],
    require: "status must be 1 or 2",
  },
  quantity: {
    type: Number,
  },
  date: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
  sent_email: {
    type: Boolean,
    default: false,
  },
});
const Booking = mongoose.model("Booking", booking);
module.exports = Booking;
