const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const { REF } = require("./../commons/constant");
const bcrypt = require("bcryptjs");
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
  phone: {
    type: String,
    required: [true, "Bạn phải nhập số điện thoại !"],
    validate: {
      validator: function (el) {
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(el);
      },
      message: "Nhập đúng định dạng",
    },
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
    select: false,
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
  gender: {
    type: Number,
    enum: [0, 1],
    default: null,
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
//hash pass
userSchema.pre("save", async function (next) {
  //nếu k bị thay đổi thì cho chạy
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  //del password confirm
  this.passwordConfirm = undefined;
  next();
});
//hash password khi đăng nhập
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.changePassAfter = function (JWTTimestamp) {
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
