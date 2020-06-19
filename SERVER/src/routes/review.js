const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewControllers = require("../controllers/reviewControllers");
const authControllers = require("../controllers/authControllers");
/* GET home page. */

router.use(authControllers.protected)
router
  .route("/")
  .get(reviewControllers.getReview)
  .post(reviewControllers.createReview)

module.exports = router;
