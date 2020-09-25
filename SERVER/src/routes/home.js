const express = require("express");
const router = express.Router();
const homeControllers = require("../controllers/homeControllers");
/* GET home page. */
router.route("/").get(homeControllers.getHome);

module.exports = router;
