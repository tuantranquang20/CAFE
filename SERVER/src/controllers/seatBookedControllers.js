const SeatBooked = require("./../models/seatBookedModals");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");

exports.createSeatBooked = async (req, res, next) => {
  try {
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
