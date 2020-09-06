const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");

const cinemaSchema = new mongoose.Schema({
  nameCinema: {
    type: String,
    required: [true, "Phải nhập tên rạp"],
  },
  address: {
    type: String,
  },
});

const Cinema = mongoose.model(REF.CINEMA, cinemaSchema);
module.exports = Cinema;
