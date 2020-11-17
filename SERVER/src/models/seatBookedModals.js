const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");

const seatBookedSchema = new mongoose.Schema({});

const SeatBooked = mongoose.model(REF.SEAT_BOOKED, seatBookedSchema);
module.exports = SeatBooked;
