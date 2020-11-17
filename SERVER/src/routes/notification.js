const express = require("express");
const router = express.Router();
// const homeControllers = require("../controllers/");
const notificationControllers = require("../controllers/notificationControllers");
/* GET home page. */
router
  .route("/")
  .get(notificationControllers.getNotification)
  .post(notificationControllers.createNotification);

module.exports = router;
