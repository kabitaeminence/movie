const validator = require("../validator/validator");

const signup = (req, res, next) => {
  const validationRule = {
    email: "required|email",
    Name: "required|string",
    password: "required|string|min:6|confirmed",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (status) {
      res.send("Validation true");
      next();
    } else {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    }
  });
};
module.exports = { signup };
