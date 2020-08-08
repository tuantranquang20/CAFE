const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cartControllers");
const authControllers = require("../controllers/authControllers");
/* GET home page. */
router.use(authControllers.protected);
router
  .route("/")
  .post(cartControllers.createOrder)
  .get(cartControllers.getAllCart)
  .patch(cartControllers.updateCart)
  .delete(cartControllers.deleteItem);
router.route("/cart-detail").get(cartControllers.getCartDetail);
module.exports = router;
