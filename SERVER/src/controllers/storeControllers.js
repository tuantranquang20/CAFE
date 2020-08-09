const Store = require("./../models/storeModels");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");

exports.createStore = async (req, res, next) => {
  try {
    const result = await Store.create(req.body);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.getStore = async (req, res, next) => {
  try {
    const result = await Store.find();
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
exports.updateStore = async (req, res, next) => {
  try {
    const { idStore } = req.query;
    const result = await Store.findByIdAndUpdate({ _id: idStore }, req.body);
    console.log(result);
    res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    console.log(error);
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
