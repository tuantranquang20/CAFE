const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cartControllers");
/* GET home page. */
router
  .route("/")
  .post(cartControllers.createOrder)
  .get(cartControllers.getAllCart)
  .patch(cartControllers.updateCart)
  .delete(cartControllers.deleteItem)

module.exports = router;
