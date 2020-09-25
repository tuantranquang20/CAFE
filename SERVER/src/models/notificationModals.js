const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Phải nhập tên rạp"],
  },
  message: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  imgPath: {
    type: String,
    default: "img-default.jpg",
  },
});

const Notification = mongoose.model(REF.NOTIFICATION, notificationSchema);
module.exports = Notification;
