const mongoose = require("mongoose");
const Product = require("./productModels");
const { statusOrder } = require("./../commons/constant");

const orderSchema = new mongoose.Schema(
  {
    listOrder: [
      {
        idItem: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
        },
        qty: Number,
        description: String,
      },
    ],
    name: {
      type: String,
      required: [true, "Bạn phải nhập tên người mua!"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Bạn phải nhập số điện thoại người nhận!"],
      validate: {
        validator: function (el) {
          return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(el);
        },
        message: "Nhập đúng định dạng",
      },
    },
    address: {
      type: String,
      required: [true, "Bạn phải nhập địa điểm lấy hàng!"],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: Number,
      default: statusOrder.WATTING_CONFIRM,
    },
  },
  {
    versionKey: false,
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "listOrder.idItem",
    select: "-__v",
  });
  next();
});
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
