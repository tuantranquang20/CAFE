const fs = require("fs");
const mongoose = require("mongoose");
const User = require("./../models/userModels");
const Product = require("./../models/productModels");
const Cart = require("./../models/cartModels");
const url = "mongodb://localhost:27017/cafe";

//connect đến db
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/product.json`, "utf-8")
);
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
// );

//import data
const importData = async () => {
  try {
    // await Tour.create(tours);
    await Product.create(product);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log("Import thành công b!");
  } catch (error) {
    console.log(error, "Lỗi khi import rồi b!");
  }
  process.exit();
};

const deleteData = async () => {
  try {
    // await Tour.deleteMany();
    await Cart.deleteMany();
    // await Review.deleteMany();
    console.log("Xoá thành công b!");
  } catch (error) {
    console.log(error, "Lỗi khi xoá rồi b!");
  }
  process.exit();
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
