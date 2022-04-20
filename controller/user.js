const userData = require("../model/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { json } = require("express");

const signup = async (req, res) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    const userdata = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: pass,
      roll_Id: req.body.roll_Id,
    };
    const data = await new userData(userdata);

    const result = await userData.findOne({ email: data.email });
    if (result) {
      res.send("Email is alreaday taken  take another email or signup ");
    }

    data.save();
    console.log(data);

    return res.status(200).send({
      status: 200,
      message: `sign up has suceesfully welcome ${userdata.firstName}`,
    });
  } catch (err) {
    console.log("error", err);
    return res
      .status(500)
      .send({ status: 500, message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const password = req.body.password;
  const data = await userData.findOne({ email: req.body.email });

  if (data) {
    const check_password = await bcrypt.compare(password, data.password);

    if (check_password) {
      const token = jwt.sign({ _id: data._id }, "hash");
      return res.status(200).send({
        status: true,
        message: `login successful ${data.Name} `,
        token: token,
      });
    } else {
      return res.send("incorrect password");
    }
  } else {
    return res.status(404).send({ status: false, message: "User Not exist " });
  }
};

const get = async (req, res) => {
  try {
    const data = await userData.find();
    console.log(data);
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await userData.findById(_id);
    return res.status(200).json({ data: data });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const patch = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await userData.updateOne(_id, req.body, {
      new: true,
    });
    return res.status(200).json({ data: data });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const remove = async (req, res) => {
  try {
    const _id = req.params.id;

    const data = await userData.deleteOne({ _id });
    return res.status(200).json({ data: data });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  signup,
  get,
  patch,
  remove,
  login,
  getById,
};
