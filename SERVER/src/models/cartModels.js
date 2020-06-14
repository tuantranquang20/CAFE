const mongoose = require("mongoose");
const Product = require("./productModels");

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    qty: Number,
    sumPrice: {
      type: Number,
      default: 0,
    },
    description: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
  }
);

cartSchema.pre(/^find/,function(next){
  this.populate({
    path: "product",
    select: "-__v",
  });
  next();
});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
