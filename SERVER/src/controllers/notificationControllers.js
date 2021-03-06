const Notification = require("./../models/notificationModals");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");

exports.getNotification = async (req, res, next) => {
  try {
    console.log("get Notification");
    // res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
exports.createNotification = async (req, res, next) => {
  try {
    const result = await Notification.create(req.body);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
