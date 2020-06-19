"use strict";

module.exports = {
  error: function (error, message = null) {
    return {
      status: 0,
      // code: error.code,
      msg: message || error.message,
      // data: {}
    };
  },
  success: function (data, message, ) {
    return {
      status: 1,
      code: 1,
      // token,
      result: data.length,
      msg: message ||  "Thành công",
      data: data
    };
  }
};
