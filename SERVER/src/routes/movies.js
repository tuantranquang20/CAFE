const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const moviesControllers = require("../controllers/moviesControllers");
// const { uploadImg } = require("../ultils/upload");
// const { resizeImg } = require("../ultils/resize");
/* GET movies page. */
router.use(authControllers.protected);

router
  .route("/")
  .get(moviesControllers.getMovies)
  .post(moviesControllers.createMovie)
  .patch(moviesControllers.updateMovies)
  .delete(moviesControllers.deleteMovies);
module.exports = router;
