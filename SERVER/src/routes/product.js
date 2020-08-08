const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
const authControllers = require("../controllers/authControllers");
/* GET home page. */
router.route("/").get(productControllers.getAllProduct);
router
  .route("/detail")
  .get(productControllers.getQuery, productControllers.getOne);

//chỉ có admin hoặc guild mới có thể được làm những điều bên dưới \
//check đăng nhập
router.use(authControllers.protected);
//check admin
router.use(authControllers.checkRole);
router
  .route("/")
  .post(productControllers.createProduct)
  .patch(productControllers.updateProduct)
  .delete(productControllers.deleteProduct);
module.exports = router;
