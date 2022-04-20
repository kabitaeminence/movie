const showData = require("../model/show");
const moment = require("moment");
const movie = require("../model/movie");

const create = async (req, res) => {
  const { movieId, start_time, end_Time, date } = req.body;
  const obj = {
    movieId,
    start_time,
    end_Time,
    date,
  };
  const show = await showData.create(obj);
  show.save();
  res.status(200).send(show);
};

const filterdata = async (req, res) => {
  const data = req.body;
  let query = {};
  if (data.start_time) query.start_time = { $gt: data.start_time };

  const count = await showData.countDocuments(query);
  const filterData = await showData.find(query);

  res.json({ data: filterData, totalCount: count });

  // const showDatatime = await showData.find();
  // const showDatatimeMap = showDatatime.map((x) => {
  //   // console.log(showDatatimeMap);
  //   var dt = moment("2022-04-19T06:40:00.000Z", ["hh:mm A"]).format("hh:mm");
  //   console.log(dt);
  //   console.log(x.start_time);
  // });
};

const get = async (req, res) => {
  try {
    const shows = await showData.find().populate("movieId");
    return res.status(200).json({ data: shows });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const patch = async (req, res) => {
  try {
    const _id = req.params.id;
    const show = await showData.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    return res.status(200).json({ data: show });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const remove = async (req, res) => {
  try {
    const _id = req.params.id;
    const show = await showData.deleteOne({ _id });
    return res.status(200).json({ data: show });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getMovies_start_Time = async (req, res) => {
  try {
    // const data = await showData.find();

    const movieName = req.body.movieName;
    const movieData = await movie.findOne({ movieName: movieName });
    console.log(movieData._id);

    const showdata = await showData.find({ movieId: movieData._id });
    const data1 = showdata.map((x) => {
      console.log(x.start_time);
    });
    return res.status(200).json({ data: showdata });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { create, get, patch, remove, filterdata, getMovies_start_Time };
