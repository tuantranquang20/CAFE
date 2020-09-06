const Room = require("./../models/roomModals");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");

exports.getRoom = async (req, res, next) => {
  try {
    const result = await Room.find();
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
exports.createRoom = async (req, res, next) => {
  try {
    const result = await Room.create(req.body);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
