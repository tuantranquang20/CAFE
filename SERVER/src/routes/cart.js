const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cartControllers");
/* GET home page. */
router
  .route("/")
  .post(cartControllers.createOrder)
  .get(cartControllers.getAllCart);

module.exports = router;
