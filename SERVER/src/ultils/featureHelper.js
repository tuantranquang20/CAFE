const jwt = require("jsonwebtoken");
//thư viện dịch token
const { promisify } = require("util");

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
