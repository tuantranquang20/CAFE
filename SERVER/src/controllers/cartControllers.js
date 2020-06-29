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
  let total = 0;
  try {
    const result = await Cart.find();
    result.map((el) => {
      total += el.sumPrice;
      return total;
    });
    res.json(
      response.success(
        {
          data: {
            totalPrice: total,
            item: result,
          },
        },
        apiCode.SUCCESS.message
      )
    );
  } catch (error) {
    console.log(error);
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.updateCart = async (req, res, next) => {
  const { qty, sumPrice, idItem } = req.body;
  console.log(req.body);
  try {
    const result = await Cart.findByIdAndUpdate(idItem, { qty, sumPrice });
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
exports.deleteItem = async (req, res, next) => {
  // console.log(req.body.item);
  try {
    const result = await Cart.remove({ _id: req.body.item });
    res.json(response.success(result, apiCode.DELETE_SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
