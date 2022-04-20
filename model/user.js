const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  email: {
    type: String,
    unique: [true, "Email id already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("invalide Email");
      }
    },
  },

  password: {
    type: String,
    unique: true,
  },

  roll_Id: {
    type: Number,
    enum: [1, 2],
    require: "status must be 1 or 2",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
