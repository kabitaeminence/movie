const moment = require("moment");

var nodemailer = require("nodemailer");
const showData = require("../model/show");
const cron = require("node-cron");

const booking = require("../model/booking");
const User = require("../model/user");

const movie = require("../model/movie");

const sendmailbookTicket = async (req, res, next) => {
  const { email } = req.body;

  const data = await User.findOne({ email: email });
  const { quantity } = req.body;

  const bookdata = await booking.findOne({ quantity: quantity });
  console.log(req.body.date, "+++++++++++++++++++++++++++++");
  const { seatsNumber, price, movieName } = req.body;
  const movieData = await movie.findOne({
    seatsNumber: seatsNumber,
    price: price,
    movieName: movieName,
  });
  const { start_time, end_Time } = req.body;

  const showdata = await showData.findOne({
    start_time: start_time,
    end_Time: end_Time,
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    TLS: true,
    port: 587,
    auth: {
      user: "test.dev788@gmail.com",
      pass: "admin@1234!",
    },
  });

  var mailOptions = {
    from: "test.dev788@gmail.com",
    to: "kabita20@navgurukul.org",
    subject: "Sending Email booking ticket",
    text: `${data.fristName} you have confirmed your ticket
          you booked ${bookdata.quantity},
          your seatsNumber ${movieData.seatsNumber}
          your total price ${movieData.price}
          your timing ${showdata.start_time} to ${showdata.end_Time} ,
          move name is ${movieData.movieName}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(error);
      console.log(error);
    } else {
      console.log("Email sent successfully: " + info.response);
      res.send("Email sent successfully: " + info.response);
    }
  });
};

//----------------------------------------------------------------------------------------

const sendmailReminder = async (req, res) => {
  const { email } = req.body;

  const data = await User.findOne({ email: email });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    TLS: true,
    port: 587,
    auth: {
      user: "test.dev788@gmail.com",
      pass: "admin@1234!",
    },
  });

  const bookingData = await booking.find();

  var mailOptions = {
    to: "kabita20@navgurukul.org",
    subject: "Sending Email remaning show timing",
    text: `${data.fristName} :- you have confirmed your ticket
                                you have only less the and equal to 60 minutes
                                for starting movie show ........`,
  };

  var bookDateTime = bookingData.map((x) => {
    var dataBasesTime = x.date;
    console.log(dataBasesTime);

  

    var a = moment();
    var b = moment(dataBasesTime);
    const minutes = b.diff(a, "minutes");
    console.log(minutes, "minutes");

    if (minutes <= 60) {
      console.log("email send successfuly");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.send(error);
          console.log(error);
        } else {
          console.log("Email sent successfully: " + info.response);
          res.send("Email sent successfully: " + info.response);
        }
      });
    } else {
      console.log("dont send email more then 1 hours time is left ");
    }
  });
};

module.exports = { sendmailbookTicket, sendmailReminder };
