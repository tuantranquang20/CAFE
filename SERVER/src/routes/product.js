const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
/* GET home page. */
router
  .route("/")
  .get(productControllers.getAllProduct)
  .post(productControllers.createProduct)
  .patch(productControllers.updateProduct)
  .delete(productControllers.deleteProduct);
router
  .route("/detail")
  .get(productControllers.getQuery, productControllers.getOne);
module.exports = router;
