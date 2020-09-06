const express = require('express');
const router = express.Router();
const roomControllers = require('../controllers/roomControllers')
/* GET home page. */
router.route('/').get(roomControllers.getRoom).post(roomControllers.createRoom)

module.exports = router;
