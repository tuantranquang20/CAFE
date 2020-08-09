const express = require("express");
const router = express.Router({ mergeParams: true });
const storeControllers = require("../controllers/storeControllers");
const authControllers = require("../controllers/authControllers");
/* GET home page. */

router.use(authControllers.protected);
router.route("/").get(storeControllers.getStore);
router.use(authControllers.checkRole);
router
  .route("/")
  .post(storeControllers.createStore)
  .patch(storeControllers.updateStore);

module.exports = router;
