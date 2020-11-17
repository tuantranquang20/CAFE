const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");
const moment = require("moment");

const orderBookingSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: REF.MOVIE,
      required: [true, "Phải từ 1 phim nào đó"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: REF.USER,
      required: [true, "Phải từ 1 phim nào đó"],
    },
    timeShow: {
      type: String,
    },
    seatReserved: {
      type: String,
      require: [true, "Phải đặt ghế nào đó"],
    },
    totalPrice: {
      type: Number,
      require: [true, "Phải đặt có tổng số tiền"],
    },
    numberTicket: {
      type: Number,
      require: [true, "Phải đặt có tổng số tiền"],
    },
    dateMovie: {
      type: Date,
      default: Date.now(),
    },
    voucher: {
      type: String,
    },
    createAt: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
    },
  },
  {
    versionKey: false,
  }
);
orderBookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "movie",
    select: "-__v",
  }).populate({
    path: "user",
    select: "-__v",
  });
  next();
});
const OderBooking = mongoose.model(REF.ORDER_BOOKING, orderBookingSchema);
module.exports = OderBooking;
