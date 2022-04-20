const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const validator = require("validator");

mongoose
  .connect("mongodb://localhost:27017/Movie", {
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiesTopology:true
  })
  .then(() => {
    console.log("connection is successfully");
  })
  .catch((err) => {
    console.log("no connection");
  });

const userRouter = require("./router/user");

const showRouter = require("./router/show");
const moviedata = require("./router/movie");
const bookingrouter = require("./router/booking");

app.use(express.json());
app.use("/users", userRouter);

app.use("/show", showRouter);

app.use("/movie", moviedata);

app.use("/booking", bookingrouter);

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server is running port number 3000--");
});
