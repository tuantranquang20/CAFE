const Review = require("./../models/reviewModels");
const Order = require("./../models/orderModels");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");

exports.createReview = async (req, res, next) => {
  const { idOrder } = req.query;
  const { rating, review } = req.body;
  try {
    const qOrder = await Order.findById(idOrder);
    if (!qOrder) {
      return res.json(
        response.error(apiCode.DB_ERROR, apiCode.DB_ERROR.message)
      );
    }
    //check xem order đó đã đc thanh toán thành công chưa
    const checkStatusOrder = qOrder.statusOrder(qOrder);
    if (!checkStatusOrder) {
      return res.json(
        response.error(apiCode.DB_ERROR, apiCode.INVALID_PARAM.message)
      );
    }
    const result = await Review.create({
      user: req.user._id,
      order: idOrder,
      rating: rating,
      review: review,
    });
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    console.log(error);
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const result = await Review.find({user : req.user._id});
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
