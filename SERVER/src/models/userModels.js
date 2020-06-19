const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const { REF } = require("./../commons/constant");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Bạn phải nhập tên !"],
  },
  email: {
    type: String,
    required: [true, "Bạn phải nhập email !"],
    unique: true,
    validate: [validator.isEmail, "Nhập đúng định dạng email !"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Bạn phải nhập mật khẩu !"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Bạn phải nhập xác nhận mật khẩu !"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Xác nhận mật khẩu lỗi !",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.changePassAfter = function (JWTTimestamp) {
  // console.log(JWTTimestamp, "vcl b");
  // console.log(this.passwordChangedAt.getTime() / 1000, "get nó ra b");
  if (this.passwordChangedAt) {
    //nếu mà đã thay đổi thì
    const changeTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changeTimestamp; // bool
    //ví dụ 8h đăng nhập thì nó lưu cái token là 8h đăng nhập
    //9h đổi pass, thì cái changeTimeStamp là 9h
    //client check JWTTimestamp < changeTimestamp (8h<9h) => đăng nhập lại
    //10h đăng nhập check (10h<9h) => chưa đổi pass
  }
};
userSchema.methods.createPasswordResetToken = function (next) {
  //tạo cái token mới
  const resetToken = crypto.randomBytes(32).toString("hex");
  //token xác thực thay đổi passs

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model(REF.USER, userSchema);
module.exports = User;
