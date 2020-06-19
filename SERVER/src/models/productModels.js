const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");

const productSchema = new mongoose.Schema({
  idProduct: {
    type: String,
    required: [true, "phải nhập mã sản phẩm"],
    unique: true,
  },
  idBranch: {
    type: String,
    required: [true, "phải nhập mã ngành hàng"],
  },
  name: {
    type: String,
    required: [true, "Bạn phải nhập tên sản phẩm !"],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, "Bạn phải nhập giá sản phẩm !"],
  },
  photo: {
    type: String,
    default: "default-product.jpg",
    required: [true, "Bạn phải tải ảnh sản phẩm !"],
  },
  description: {
    type: String,
  },
  discount: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  review: String,
  active: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model(REF.PRODUCT, productSchema);
module.exports = Product;
