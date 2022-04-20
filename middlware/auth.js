const jwt = require("jsonwebtoken");

const validate = require("validator");

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    const user = jwt.verify(token, "hash");
    console.log(user, "**********88");
    req.params.userId = user._id;
    console.log("valid token");

    next();
  } catch (err) {
    console.log("Error == ", err.message);
    return res.status(401).json({ err: "Not Autheticated!" });
  }
};

module.exports = { authenticateToken };
