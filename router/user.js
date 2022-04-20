const ControllerUser = require("../controller/user");

const { authenticateToken } = require("../middlware/auth");

const { signup } = require("../middlware/validator");

const express = require("express");

const router = express.Router();

router.get("/", ControllerUser.get);

router.post("/", ControllerUser.signup);

router.get("/:id", authenticateToken, ControllerUser.getById);

router.patch("/:id", ControllerUser.patch);

router.delete("/:id", ControllerUser.remove);

router.post("/login", ControllerUser.login);

module.exports = router;
