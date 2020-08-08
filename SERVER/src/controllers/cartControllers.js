const Cart = require("./../models/cartModels");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");
const { checkUser } = require("../ultils/featureHelper");

exports.createOrder = async (req, res, next) => {
  const { idItem, description } = req.body;
  try {
    //finall
    const user = await checkUser(req);
    if (!user) {
      return response.error(
        apiCode.NOT_FOUND_REQUEST,
        apiCode.NOT_FOUND.message
      );
    }
    const resultProduct = await Cart.find();
    //tìm cái el.idItem._id === idItem
    const resultItem = resultProduct.find((el) => el.idItem._id == idItem);
    if (resultItem) {
      const { _id, qty, idItem } = resultItem;
      const { price } = idItem;
      const qtyUpdate = qty + 1;
      //chỉ update + cái qty lên 1 và sumPrice = tổng sp * giá
      const resultUpdateCart = await Cart.findOneAndUpdate(
        { _id },
        {
          qty: qtyUpdate,
          sumPrice: qtyUpdate * price,
          description,
        }
      );
      return res.json(
        response.success(resultUpdateCart, apiCode.UPDATE_SUCESSS.message)
      );
    }
    const result = await Cart.create(
      Object.assign(req.body, { idUser: user._id })
    );
    return res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    return res.json(response.error(error, apiCode.DB_ERROR.message));
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
  try {
    const result = await Cart.findByIdAndUpdate(idItem, { qty, sumPrice });
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
exports.deleteItem = async (req, res, next) => {
  try {
    const result = await Cart.remove({ _id: req.body.item });
    res.json(response.success(result, apiCode.DELETE_SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.getCartDetail = async (req, res, next) => {
  try {
    const user = await checkUser(req);
    const result = await Cart.findOne({
      _id: req.query.idCart,
      idUser: user._id,
    });
    console.log(result);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
