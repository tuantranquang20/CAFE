const User = require("../models/userModels");
const response = require("../commons/response");
const {apiCode} = require("../commons/constant");
// const User = require("../models/userModels");
exports.getRoomChat = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const result = await User.find({ userID: { $in: userID || null } });
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
