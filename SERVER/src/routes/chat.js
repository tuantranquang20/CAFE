const express = require("express");
const router = express.Router();
const chatControllers = require("../controllers/chatControllers");
/* GET home page. */
router.route("/").post(chatControllers.getRoomChat);
module.exports = router;
