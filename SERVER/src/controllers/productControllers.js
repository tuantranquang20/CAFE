const Product = require("./../models/productModels");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");
exports.getQuery = (req, res, next) => {
  const { id } = req.query;
  req.id = id;
  next();
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const result = await Product.find(req.query);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const result = await Product.findById(req.id);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
