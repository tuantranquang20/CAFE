const mongoose = require("mongoose");
const { REF } = require("./../commons/constant");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
    },
    ratingsQuantity: {
      type: Number,
      default: 5,
    },
    description: {
      type: String,
    },
    imageCover: {
      type: String,
    //   required: [true, "A tour must have a cover image"],
    },
    images: [String],
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);
const Store = mongoose.model(REF.STORE, storeSchema);
module.exports = Store;
