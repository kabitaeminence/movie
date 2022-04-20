const bookingData = require("../model/booking");
const userData = require("../model/user");
const showData = require("../model/show");

const movie = require("../model/movie");
const { name } = require("agenda/dist/agenda/name");

const create = async (req, res) => {
  const { userId, showId, status, quantity, bookingDate, date } = req.body;
  const obj = {
    userId,
    showId,
    status,
    quantity,
    date,
    bookingDate: new Date(bookingDate),
  };
  const booking = await bookingData.create(obj);
  booking.save();

  return res.status(200).send(booking);
};

const filterdata = async (req, res) => {
  const data = req.body;
  const data1 = await bookingData.find();
  // console.log(data1, "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{");
  var bookDateTime = data1.map(async (x) => {
    var dataBasesTime = x.date;
    console.log(dataBasesTime, "((((((((((((((((((((((((((((((((");
    var d = new Date(dataBasesTime);
    var dHours = d.getUTCHours(); // Hours

    console.log(dHours);

    if (dHours > 4) {
      console.log(x.userId, "oooooooooooooooooooooooo");
      const userName = await userData.findOne({
        _id: x.userId,
      });

      // console.log(userName);
      console.log(userName.lastName);
    } else {
      console.log("jsjsjjsjsjs");
    }
  });
  // const userName = await userData.find();
  // console.log(userName);
  // const userNameFind = userName.map((x) => {
  //   var userNameFilter = x.lastName;
  //   console.log(userNameFilter, "OOOOOOOOOOOOOOOOOO");
  // });

  let query = {};

  // let userName = {};
  // if (data.date) query.date = { $gt: data.date };
  // if (data.firstName) userName.firstName = { $in: data.firstName };

  // const count = await bookingData.countDocuments(query);

  const filterData = await bookingData.find().populate("userId");
  // console.log(filterData.userId[0].fristName);
  const user = await userData.findOne({ fristName: req.body.firstName });
  // console.log(user);

  // console.log(filterData);
  res.json({ data: filterData });
};

const get = async (req, res) => {
  try {
    const booking = await bookingData
      .find()
      .populate("userId")
      .populate("showId");
    // console.log(booking.userId)

    return res.status(200).json({ data: booking });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const patch = async (req, res) => {
  try {
    const _id = req.params.id;
    const booking = await bookingData.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    return res.status(200).json({ data: booking });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const remove = async (req, res) => {
  try {
    const _id = req.params.id;
    const booking = await bookingData.deleteOne({ _id });
    return res.status(200).json({ data: booking });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const get_Userid_showid_movieId = async (req, res) => {
  try {
    console.log(req.body);
    const data = await showData.find();
    const userId = req.body.userId;
    const username = req.body.username;
    const userdata = await userData.findOne({ lastName: username });
    console.log(userdata.lastName);
    console.log(userdata._id, "useridddddddddddd");

    const book = await bookingData.findOne({ userId: userdata._id });

    console.log(book.showId, "showid");

    const show = await showData.findOne({ _id: book.showId });
    console.log(show.movieId, "movieid");

    // const movied = await movie.findOne({ _id: show.movieId });

    // const movieName = req.body.movieName;
    // console.log(movieName)
    // const movieData = await movie.findOne({ movieName: movieName });
    // console.log(movieData._id);

    // const showdata = await showData.find({ movieId: movieData._id });
    // const data1 = showdata.map((x) => {
    //   console.log(x.start_time);
    // });
    // const userName = await userData.find({ lastName: username });
    // return res.status(200).json({ data: showdata });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const count_booking_movie_by_user = async (req, res) => {
  try {
    const username = req.body.username;
    const userdata = await userData.findOne({ firstName: username });
    console.log(userdata.firstName);
    console.log(userdata._id, "useridddddddddddd");

    const book = await bookingData.findOne({ userId: userdata._id }).count();

    console.log(book, "times");

    return res.status(200).json({ data: userdata.firstName });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  create,
  get,
  patch,
  remove,
  filterdata,
  get_Userid_showid_movieId,
  count_booking_movie_by_user,
};
