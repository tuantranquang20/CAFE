const multer = require("multer");
const sharp = require("sharp");
const User = require("./../models/userModels");
const { getTokenUser } = require("./../ultils/featureHelper");
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.getUserInfo = async (req, res, next) => {
  try {
    const token = await getTokenUser(req);
    const result = await User.findById(token);
    res.json({
      status: 1,
      message: "Thành công",
      data: result,
    });
  } catch (error) {
    console.log(error, "lỗi rồi b");
    res.json({
      status: 0,
      message: "Thất bại",
    });
  }
};
exports.createUser = async (req, res, next) => {
  try {
    const result = await User.create(req.body);
    res.json({
      status: 1,
      message: "Thành công!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 0,
      message: "Thất bại khi tạo user!",
      error: error,
    });
  }
};
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    //nếu bắt đầu định dạng file đúng là image
    //thì gọi đến cb
    console.log(file);
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
exports.uploadUserPhoto = upload.single("photo");
//upload nhiều ảnh
// exports.uploadUserPhoto = upload.fields([{ name: "photo", maxCount: 3 }]);
exports.resizeUserPhoto = async (req, res, next) => {
  //thiết lập xong đường nơi lưu và hình ảnh thì bắt đầu resize để lưu path vô db
  try {
    if (!req.file) return next();
    //tạo ra trường filename
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
    //bắt đầu resize và lưu vào public/img/users/ với tên là filename
    await sharp(req.file.buffer)
      .resize(1000, 1000)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(`public/images/users/${req.file.filename}`);
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

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    //lấy các keys của req.body truyền vào
    if (allowedFields.includes(el)) {
      //lọc chỉ nhận những giá trị trong obj = allowedFields
      //sau đó lưu lại cái newObj[tại cái phần tử giống] = obj[tại cái phần tử giống đó]
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

//cần cái update hình ảnh của user sử dụng multer
exports.updateUser = async (req, res, next) => {
  //cần lưu lại cái add thêm cái đường dẫn ảnh vô cái để gửi lên db
  const filteredBody = filterObj(req.body, "name", "email");
  //lưu lại đường dẫn ảnh vô cái obj định truyền đi
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      filteredBody
    );
    res.json({
      status: 1,
      message: "Update thành công",
      data: result,
    });
  } catch (error) {
    res.json({
      status: 0,
      message: "Update lỗi",
    });
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const result = await User.findOneAndDelete(req.params.id);
    res.json({
      status: 1,
      message: R.deleteUserSuccess,
      data: result,
    });
  } catch (error) {
    res.json({
      status: 0,
      message: R.deleteUserFail,
    });
  }
};

exports.findUser = async (req, res, nex) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.json({
        status: 0,
        message: R.fail,
        data: "Không tìm thấy user!",
      });
    }
    res.json({
      status: 0,
      message: R.success,
      data: user,
    });
  } catch (error) {
    res.json({
      status: 0,
      message: R.fail,
      data: error,
    });
  }
};
