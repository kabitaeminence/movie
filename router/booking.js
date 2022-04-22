const bookingdata = require("../controller/booking");
const { sendmailbookTicket, sendmailReminder } = require("../nodeemail/email");

const express = require("express");
router.get(
  "/find_movie_name_by_user_name",
  bookingdata.find_movie_name_by_user_name
);

const router = express.Router();
router.get("/delet_show_given_by_user_m)ovie_name",bookingdata.delet_show_given_by_user_movie_name)
router.get("/who_all_booked_movie_find_username",bookingdata.who_all_booked_movie_find_username)
router.get("/who_all_booked_movie_find_username",bookingdata.who_all_booked_movie_find_username)
router.put("/update_movie_time_equal_end_time/:movieId",bookingdata.update_movie_time_equal_end_time)
router.put("/update_movie_time/:movieId", bookingdata.update_movie_time);

// router.get("/count_booking_movie", bookingdata.count_booking_movie);
router.get("/count_booking_movie_by_user",bookingdata.count_booking_movie_by_user)
router.get("/get_Userid_showid_movieId", bookingdata.get_Userid_showid_movieId);

router.post("/filter", bookingdata.filterdata);

router.get("/", bookingdata.get);
router.post("/", bookingdata.create);
router.post("/remaimder", sendmailReminder, bookingdata.create);

router.post("/sendmail", sendmailbookTicket, bookingdata.create);

router.patch("/:id", bookingdata.patch);

router.delete("/:id", bookingdata.remove);

module.exports = router;
