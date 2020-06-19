const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const cartControllers = require("../controllers/cartControllers");
const reviewRouter = require('./review')
/* GET home page. */

router.use("/review-order", reviewRouter)

router
  .route("/")
  .get(orderControllers.getAllOrder)
  .post(orderControllers.createOrder)
  // .patch(orderControllers)

module.exports = router;
