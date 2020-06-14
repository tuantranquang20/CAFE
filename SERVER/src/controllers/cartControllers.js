const Cart = require("./../models/cartModels");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");

exports.createOrder = async (req, res, next) => {
  try {
    const result = await Cart.create(req.body);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
exports.getAllCart = async (req, res, next) => {
  try {
    const result = await Cart.find();
    res.json({
      status: 1,
      code: 1,
      msg: "Thành công",
      data: {
        totalPrice: 0,
        item: result,
      },
    });
  } catch (error) {
      console.log(error);
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
