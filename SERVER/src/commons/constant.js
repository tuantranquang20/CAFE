"use strict";
const debug = require("debug");

module.exports = {
  // error code
  statusCode: {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 403,
    MULTIPLE_CHOICES: 300,
    FORBIDDEN: 403,
  },
  apiCode: {
    SUCCESS: { code: 1, message: "Thành công" },
    DB_ERROR: { code: 2, message: "Truy vấn lỗi" },
    WRONG_TYPE_ACCOUNT: { code: 3, message: "Không đúng loại user" },
    DELETE_IMAGE_ERROR: { code: 4, message: "Lỗi xoá ảnh" },
    ACCOUNT_EXIST: { code: 5, message: "Tài khoản đã tồn tại" },
    WRONG_PASSWORD: { code: 6, message: "Sai mật khẩu" },
    UPLOAD_IMAGE_ERROR: { code: 7, message: "Lỗi upload ảnh" },
    CREATE_USER_ERROR: { code: 8, message: "Lỗi tạo tài khoản" },
    INVALID_PARAM: { code: 9, message: "Tham số không hợp lệ" },
    REVIEW_ORDER_ERROR: { code: 10, message: "Lỗi đánh giá" },
    NOT_FOUND: { code: 11, message: "Dữ liệu không tồn tại " },
    FB_ERROR: { code: 12, message: "" },
    UNAUTHORIZED: { code: 403, message: "Không có quyền truy cập" },
    INVALID_ACCESS_TOKEN: { code: 404, message: "Token không hợp lệ" },
    NO_PERMISSION: { code: 13, message: "Không có quyền thực hiện chức năng" },
    NOT_ACCOUNT_EXIST: { code: 14, message: "Tài khoản không tồn tại" },
    UPDATE_USER_ERROR: { code: 15, message: "Lỗi cập nhật tài khoản" },
    PAGE_ERROR: { code: 16, message: "Lỗi truyền trang" },
    PLACE_ERROR: { code: 17, message: "Không thể lấy được địa chỉ" },
    UPDATE_FAIL: { code: 18, message: "Cập nhật không thành công" },
    DATA_EXIST: { code: 19, message: "Dữ liệu đã tồn tại" },
    DELETE_SUCCESS: { code: 20, message: "Xoá thành công" },
    PASSWORD_ERROR: {
      code: 0,
      message: "Mật khẩu không đúng hoặc không hợp lệ!",
    },
    NOT_FOUND: {
      code: 21,
      message: "Không tìm thấy sản phẩm hoặc sản phẩm đã bị xoá!",
    },
    UPDATE_SUCESSS: { code: 22, message: "Chỉnh sửa thành công" },
  },
  statusOrder: {
    WATTING_CONFIRM: 1,
    CONFIRM: 2,
    PAYED: 3,
    CANCEL: 0,
  },
  debug: {
    db: debug("app:dbquery"),
    log: debug("app:log"),
    debug: debug("app:debug"),
    error: debug("app:error"),
    email: debug("app:email"),
  },
  REF: {
    USER: "user",
    ORDER: "order",
    CART: "cart",
    PRODUCT: "product",
    REVIEW: "review",
  },
  roles: {
    ADMIN: "admin",
    USER: "user",
  },
};
