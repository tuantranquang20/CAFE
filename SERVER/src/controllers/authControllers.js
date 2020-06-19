const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModels");
const sendEmail = require("./../ultils/email");
//thư viện dịch token
const { promisify } = require("util");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");
const { checkToken } = require("./../ultils/featureHelper");

const signToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: "90d",
  });
};

const createSendToken = (user, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  // Remove password from output
  user.password = undefined;
  res.json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({
        status: 0,
        message: "Nhập email và password !",
      });
    }
    const user = await User.findOne(req.body);
    if (!user) {
      return res.json({
        status: 0,
        message: "Nhập email hoặc password không đúng !",
      });
    }
    // Tim dc tài khoản đó thì bắn cho nó 1 cái token
    // req.user = user;
    createSendToken(user, req, res);
  } catch (error) {}
};

exports.protected = async (req, res, next) => {
  // console.log("cứ vào đây làm lz gì");
  // console.log(req.baseUrl , "cái đ gì vậy");
  try {
    const token = checkToken(req);
    //dịch cái token đấy
    const decoded = await promisify(jwt.verify)(token, "secret");
    //tìm trong db
    const checkUser = await User.findById(decoded.id);
    //nếu ko có thì
    if (!checkUser) {
      return res.json({
        status: 0,
        message: "Đăng nhập lại, không tìm thấy user hiện tại !",
      });
    }
    //rồi tìm xem cái pass của nó đã bị thay đổi chưa
    const changePass = checkUser.changePassAfter(decoded.iat);
    if (changePass) {
      return res.json({
        status: 0,
        message: "Đăng nhập lại, password đã bị thay đổi !",
      });
    }
    //nếu chưa đổi thì req.user = cái User vừa mới tìm đc trong db
    req.user = checkUser;
    //tất cả ổn thì next()
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      status: 0,
      message: "Đăng nhập lại, không tìm thấy user hiện tại !",
    });
  }
};

//quên mật khẩu, rồi gửi đến email
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  //nếu k có user
  if (!user) {
    return res.json({
      status: 0,
      message: "Không tìm thất email!",
    });
  }
  //tạo 1 cái token mới, token này để reset token cũ
  const resetToken = user.createPasswordResetToken();
  //cái này là để lưu lại cái this. bên kia
  const userSave = await user.save({ validateBeforeSave: false });
  //config đường dẫn đển nhận vào cái resetToken để resetPass
  const URLreset = `${req.protocol}://${req.get(
    "host"
  )}/users/resetPassword/${resetToken}`;
  const message = `Nhấp vào đường dẫn để hoàn thành việc reset mật khẩu: ${URLreset}.`;
  try {
    //gửi nó đến email nè bạn
    const sendResetPassword = await sendEmail({
      email: req.body.email,
      subject: "Đặt lại mật khẩu của bạn",
      message,
    });
    return res.json({
      status: 1,
      message: `Đã gửi đến email ${req.body.email} !`,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(error);
    return res.json({
      status: 0,
      message: "Lỗi khi gửi đến email!",
    });
  }
};

//resetpass khi bấm vào cái quên mật khẩu
exports.resetPassword = async (req, res, next) => {
  try {
    //dcm lại mã hoá cái token nhận đc để nó giống cái token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    //tìm user trong db thông qua token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
      //thời hạn phải lớn hơn thời gian hiện tại
    });
    //nếu ko có?
    // console.log(user);
    if (!user) {
      return res.json({
        status: 0,
        message: "Hết hạn token hoặc token không chính xác!",
      });
    }
    //nếu có??
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    //lưu lại cái mới nhé
    await user.save({ validateBeforeSave: false });
    // //đăng ký token mới
    const tokenNew = signToken(user._id);
    return res.json({
      status: 0,
      token: tokenNew,
      message: "Đổi mật khẩu thành công !",
      data: user,
    });
    //trả về
  } catch (error) {
    console.log(error);
    return res.json({
      status: 0,
      message: "Lỗi khi gửi đến reset!",
    });
  }
};
exports.changePassword = async (req, res, next) => {
  const { password, passwordConfirm } = req.body;
  try {
    //check user
    const token = checkToken(req);
    const decoded = await promisify(jwt.verify)(token, "secret");
    const checkUser = await User.findById(decoded.id);
    if (!checkUser) {
      return res.json(
        response.error(
          { message: apiCode.NOT_ACCOUNT_EXIST.message },
          apiCode.NOT_ACCOUNT_EXIST.message
        )
      );
    }
    if (!password || !passwordConfirm) {
      return res.json(
        response.error(
          { message: apiCode.PASSWORD_ERROR.message },
          apiCode.PASSWORD_ERROR.message
        )
      );
    }
    checkUser.password = password;
    checkUser.passwordConfirm = passwordConfirm;
    await checkUser.save({ validateBeforeSave: false });
    res.json(response.success("", apiCode.SUCCESS.message));
  } catch (error) {
    console.log(error);
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
exports.checkRole = (req, res, next) => {
  const roles = ["admin", "lead-guide", "guide"];
  const roleUser = roles.includes(req.user.role);
  if (roleUser) {
    return next();
  }
  return res.json({
    status: 0,
    message: "Không đủ thẩm quyền b !",
  });
};
