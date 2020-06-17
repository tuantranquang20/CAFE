const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const cartControllers = require("../controllers/cartControllers");
/* GET home page. */
router
  .route("/")
  .get(orderControllers.getAllOrder)
  .post(orderControllers.createOrder)

module.exports = router;
