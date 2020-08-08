const Order = require("./../models/orderModels");
const Cart = require("./../models/cartModels");
const response = require("./../commons/response");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { apiCode, roles } = require("./../commons/constant");
const {
  newRequestBody,
  checkToken,
  checkUser,
} = require("./../ultils/featureHelper");
const User = require("./../models/userModels");

exports.createOrder = async (req, res, next) => {
  const { id, name, phoneNumber, address } = req.body;
  JSON.stringify(id);
  try {
    const user = await checkUser(req);
    if (!user) {
      return response.error(
        apiCode.NOT_FOUND_REQUEST,
        apiCode.NOT_FOUND.message
      );
    }
    const item = await Cart.find({
      _id: id,
    });
    if (JSON.stringify(item) === "[]") {
      return res.json(
        response.error(apiCode.NOT_FOUND_REQUEST, apiCode.NOT_FOUND.message)
      );
    }
    const reqBody = newRequestBody(item);
    const result = await Order.create({
      listOrder: reqBody,
      name: name,
      idUser: user._id,
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
    const user = await checkUser(req);
    if (!user) {
      return response.error(
        apiCode.NOT_FOUND_REQUEST,
        apiCode.NOT_FOUND.message
      );
    }
    const result = await Order.find({ idUser: user._id });
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.updateOrder = async (req, res, next) => {
  const { status, idOrder } = req.body;
  try {
    const token = checkToken(req);
    //decode để lấy id user
    const idUser = await promisify(jwt.verify)(token, "secret");
    const user = await User.findById(idUser.id);
    if (!user) {
      return res.json(
        response.error(apiCode.NOT_ACCOUNT_EXIST, apiCode.DB_ERROR.message)
      );
    }
    const role = user.role;
    switch (role) {
      case roles.ADMIN:
        const orderProduct = await Order.findById(idOrder);
        if (!orderProduct) {
          return res.json(
            response.error(apiCode.NOT_FOUND, apiCode.INVALID_PARAM.message)
          );
        }
        const result = await Order.findByIdAndUpdate(idOrder, { status });
        return res.json(
          response.success(result, apiCode.UPDATE_SUCESSS.message)
        );
        break;
      case roles.USER:
        if (status != 0) {
          return res.json(
            response.error(apiCode.NO_PERMISSION, apiCode.UNAUTHORIZED.message)
          );
        }
        if (status == 0) {
          const orderProduct = await Order.findById(idOrder);
          if (!orderProduct) {
            return res.json(
              response.error(apiCode.NOT_FOUND, apiCode.INVALID_PARAM.message)
            );
          }
          const result = await Order.findByIdAndUpdate(idOrder, { status });
          return res.json(
            response.success(result, apiCode.UPDATE_SUCESSS.message)
          );
        }
        break;
      default:
        response.error(apiCode.NOT_ACCOUNT_EXIST, apiCode.DB_ERROR.message);
        break;
    }
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
exports.getOrderDetail = async (req, res, next) => {
  const { id } = req.query;
  try {
    const user = await checkUser(req);
    if (!user) {
      return response.error(
        apiCode.NOT_FOUND_REQUEST,
        apiCode.NOT_FOUND.message
      );
    }
    if (!id) {
      res.json(response.error(apiCode.NOT_FOUND, apiCode.DB_ERROR.message));
    } else {
      const result = await Order.findOne({ _id: id, idUser: user._id });
      if (!result) {
        return res.json(
          response.error(apiCode.NOT_FOUND, apiCode.DB_ERROR.message)
        );
      } else {
        return res.json(response.success(result, apiCode.SUCCESS.message));
      }
    }
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
