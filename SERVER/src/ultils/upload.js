const multer = require("multer");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    //nếu bắt đầu định dạng file đúng là image
    //thì gọi đến cb
    //chưa biết cb ở đây nó là cái gì
    cb(null, true);
    //cb này tự next();
  } else {
    res.json({
      status: 0,
      message: "Không thấy định dạng ảnh!",
    });
  }
};

const upload = multer({
  storage: multerStorage, //nơi lưu trữ hình ảnh
  fileFilter: multerFilter, // cái này là để lấy hình ảnh
});

exports.uploadImg = upload.single("imgPath");
