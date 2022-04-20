const showData = require("../controller/show");

const express = require("express");

const router = express.Router();
router.get("/getMovies_start_Time", showData.getMovies_start_Time);

router.post("/filter", showData.filterdata);

router.get("/", showData.get);

router.post("/", showData.create);
router.patch("/:id", showData.patch);
router.delete("/:id", showData.remove);

module.exports = router;
