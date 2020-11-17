const express = require("express");
const router = express.Router();
const seatBookedControllers = require("../controllers/seatBookedControllers");
/* GET home page. */

router.route("/").post(seatBookedControllers.createSeatBooked);
module.exports = router;
