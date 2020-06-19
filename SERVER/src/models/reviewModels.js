const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");

const reiviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: REF.USER,
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: REF.ORDER,
    },
    rating: Number,
    review: String,
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);
const Review = mongoose.model(REF.REVIEW, reiviewSchema);
module.exports = Review;
