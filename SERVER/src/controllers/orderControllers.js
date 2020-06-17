const Order = require("./../models/orderModels");
const Cart = require("./../models/cartModels");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");
const { deleteItem } = require("./cartControllers");
const { newRequestBody } = require("./../ultils/featureHelper");

exports.createOrder = async (req, res, next) => {
  const { id, name, phoneNumber, address } = req.body;
  JSON.stringify(id);
  try {
  const item = await Cart.find({
    _id: id,
  });
  if (!item) {
    return res.json(response.error("", apiCode.NOT_FOUND.message));
  }
  const reqBody = newRequestBody(item);
  const result = await Order.create({
    listOrder: reqBody,
    name: name,
    phoneNumber: phoneNumber,
    address: address,
  });
  const del = await Cart.deleteMany({ _id: id });
  res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const result = await Order.find();
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
