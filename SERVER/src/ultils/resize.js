const sharp = require("sharp");

// nhận cả vào đường dẫn thích hợp nữa
exports.resizeImg = async (req, res, next) => {
  //thiết lập xong đường nơi lưu và hình ảnh thì bắt đầu resize để lưu path vô db
  try {
    if (!req.file) return next();
    //tạo ra trường filename
    req.file.filename = `movies-${req.user._id}-${Date.now()}.jpeg`;
    //bắt đầu resize và lưu vào public/img/users/ với tên là filename
    await sharp(req.file.buffer)
      .resize(null, null)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(`public/images/movies/${req.file.filename}`);
    next();
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      message: "Không thể resize ảnh",
      error: error,
    });
  }
};
