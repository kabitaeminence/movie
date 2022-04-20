const movieData = require("../model/movie");

const create = async (req, res) => {
  const { movieName, seatsNumber, price, description } = req.body;
  const obj = {
    movieName,
    seatsNumber,
    price,
    description,
  };
  const movie = await movieData.create(obj);
  movie.save();
  return res.status(200).json({ data: movie });
};

const get = async (req, res) => {
  try {
    const movies = await movieData.find();
    return res.status(200).json({ data: movies });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const patch = async (req, res) => {
  try {
    const _id = req.params.id;
    const movie = await movieData.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    return res.status(200).json({data:movie});
  } catch (e) {
    return res.status(500).send(e);
  }
};

const remove = async (req, res) => {
  try {
    const _id = req.params.id;
    const movie = await movieData.deleteOne({ _id });
    return res.status(200).json({data:movie});
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = { create, get, patch, remove };
