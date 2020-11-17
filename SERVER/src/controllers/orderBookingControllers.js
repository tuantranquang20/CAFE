const OrderBooking = require("./../models/orderBookingModals");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");

exports.createOrderBooking = async (req, res, next) => {
  try {
    const result = await OrderBooking.create(req.body);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.getOrderBooking = async (req, res, next) => {
  try {
    const result = await OrderBooking.find();
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
