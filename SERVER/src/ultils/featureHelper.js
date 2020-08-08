const jwt = require("jsonwebtoken");
//thư viện dịch token
const { promisify } = require("util");
const User = require("../models/userModels");
const { apiCode } = require("./../commons/constant");

exports.newRequestBody = (payload) => {
  const result = payload.map((el) => {
    let obj = {
      idItem: el.idItem._id,
      sumPrice: el.sumPrice,
      qty: el.qty,
      description: el.description,
    };
    let arrObj = Object.assign({}, obj);
    return arrObj;
  });
  return result;
};

exports.checkToken = (req) => {
  //kiểm tra xem có token
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  //nếu k có token ?
  if (!token) {
    return res.json({
      status: 0,
      message: "Đăng nhập lại, lỗi token !",
    });
  }
  return token;
};
exports.getTokenUser = async (req) => {
  //kiểm tra xem có token
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  //nếu k có token ?
  if (!token) {
    return res.json({
      status: 0,
      message: "Đăng nhập lại, lỗi token !",
    });
  }
  const decoded = await promisify(jwt.verify)(token, "secret");
  return decoded.id;
};
exports.checkUser = async (req) => {
  try {
    const token = this.checkToken(req);
    //decode để lấy id user
    const idUser = await promisify(jwt.verify)(token, "secret");
    const user = await User.findById(idUser.id);
    if (!user) {
      res.json(
        response.error(apiCode.NOT_FOUND_REQUEST, apiCode.DB_ERROR.message)
      );
    } else {
      return user;
    }
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
