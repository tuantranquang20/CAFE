const express = require("express");
const router = express.Router();
const orderBookingControllers = require("../controllers/orderBookingControllers");
/* GET home page. */

router
  .route("/")
  .post(orderBookingControllers.createOrderBooking)
  .get(orderBookingControllers.getOrderBooking);
module.exports = router;
