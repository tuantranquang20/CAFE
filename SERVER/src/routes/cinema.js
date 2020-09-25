const express = require("express");
const router = express.Router();
const cinemaControllers = require("../controllers/cinemaControllers");
/* GET home page. */
router
  .route("/")
  .get(cinemaControllers.getCinema)
  .post(cinemaControllers.createCinema);
  //delete

module.exports = router;
