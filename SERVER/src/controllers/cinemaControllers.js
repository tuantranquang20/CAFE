const Cinema = require("./../models/cinemaModals");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");

exports.getCinema = async (req, res, next) => {
  try {
    const result = await Cinema.find();
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.createCinema = async (req, res, next) => {
  try {
    const result = await Cinema.create(req.body);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
