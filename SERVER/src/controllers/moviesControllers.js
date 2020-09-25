const Movie = require("./../models/moviesModels");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");
const { filterObj } = require("../ultils/featureHelper");
exports.getMovies = async (req, res, next) => {
  try {
    //có thể filer nhiều chỗ này
    const result = await Movie.find();
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const result = await Movie.create(req.body);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.updateMovies = async (req, res, next) => {
  try {
    const { idMovies } = req.query;
    const result = await Movie.findByIdAndUpdate({ _id: idMovies }, req.body);
    res.json(response.success(result, apiCode.UPDATE_SUCESSS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
exports.deleteMovies = async (req, res, next) => {
  try {
    const { idMovies } = req.query;
    const result = await Movie.findByIdAndDelete({ _id: idMovies });
    res.json(response.success(result, apiCode.DELETE_SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
