const Cinema = require("./../models/cinemaModals");
const Movies = require("./../models/moviesModels");
const Product = require("./../models/productModels");
const Notification = require("./../models/notificationModals");
const OrderBooking = require("./../models/orderBookingModals");
const moment = require("moment");

const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");
const numberProduct = 10;
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

exports.getHomeAdmin = async (req, res, next) => {
  try {
    let monthDate = {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
    };
    const yearNow = moment().format("YYYY");
    //lặp qua 12 tháng, tìm tất cả đơn hàng có ngày bắt đầu là tháng đấy và ngày kết thúc là 
    //tháng đấy, sau đó lưu vào bên trên
    //nhược điểm là for 12 lần và tìm-chưa tìm ra thuật toán khác
    for (let i = 0; i < 12; i++) {
      const result = await OrderBooking.find({
        createAt: {
          $gte: `2020-${i + 1 < 10 ? `0${i+1}` : `${i+1}`}-01`,
          $lte: `2020-${i + 1 < 10 ? `0${i+1}` : `${i+1}`}-${moment(
            `${yearNow}-${i + 1 < 10 ? `0${i + 1}` : `${i + 1}`}-01`
          )
            .endOf("month")
            .format("DD")}`,
        },
      });
      result.length > 0 && (monthDate[i + 1] = result.length);
    }
    //xử lý trả về doanh thu nữa 
    res.json(response.success(monthDate, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
