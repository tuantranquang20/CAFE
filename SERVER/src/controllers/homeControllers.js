const Cinema = require("./../models/cinemaModals");
const Movies = require("./../models/moviesModels");
const Product = require("./../models/productModels");
const Notification = require("./../models/notificationModals");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");
const numberProduct = 7;
const numberNotification = 5;
exports.getHome = async (req, res, next) => {
  try {
    let result = { movies: [], products: [], notifications: [] };
    const movies = await Movies.find();
    movies.length > 0 && (result = { ...result, movies });
    const products = await Product.find().skip(0).limit(numberProduct);
    products.length > 0 && (result = { ...result, products });
    const notifications = await Notification.find()
      .skip(0)
      .limit(numberNotification);
    notifications.length > 0 && (result = { ...result, notifications });
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
