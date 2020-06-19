const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");
const cartSchema = new mongoose.Schema(
  {
    idItem: {
      type: mongoose.Schema.ObjectId,
      ref : "product",
      required: [true, "Phải thêm 1 sản phẩm"],
    },
    qty: Number,
    sumPrice: {
      type: Number,
      default: 0,
    },
    imgPath: {
      type: String,
      default: "img-default",
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "idItem",
    select: "-__v",
  });
  next();
});
const Cart = mongoose.model(REF.CART, cartSchema);
module.exports = Cart;
