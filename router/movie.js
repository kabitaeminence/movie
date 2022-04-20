const moviedata = require("../controller/movie");

const express = require("express");

const router = express.Router();

router.get("/", moviedata.get);

router.post("/", moviedata.create);

router.patch("/:id", moviedata.patch);

router.delete("/:id", moviedata.remove);

module.exports = router;
