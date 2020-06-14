const Product = require("./../models/productModels");
const response = require("./../commons/response");
const { apiCode } = require("./../commons/constant");
exports.getQuery = (req, res, next) => {
  const { id } = req.query;
  req.id = id;
  next();
};

exports.getAllProduct = async (req, res, next) => {
  const { page, limit, sort } = req.query;
  const assignQuery = Object.assign({}, req.query);
  const removeItem = ["page", "limit", "sort"];
  removeItem.forEach((el) => delete assignQuery[el]);

  const queryString = JSON.stringify(assignQuery).replace(
    /\b(gte|lte|gt|lt)\b/g,
    (match) => `$${match}`
  );
  const queryDB = JSON.parse(queryString);
  const awaitQuery = Product.find(queryDB);

  if (page) {
    const qLimit = limit * 1 || 10;
    const qSkip = (page * 1 - 1) * qLimit || 0;
    awaitQuery.skip(qSkip).limit(qLimit);
  } else {
    awaitQuery.skip(0).limit(5);
  }
  if (sort) {
    const splitString = sort.split(",").join(" ");
    awaitQuery.sort(splitString);
  }
  try {
    const result = await awaitQuery;
    return res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    return res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const result = await Product.findById(req.id);
    return res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    return res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};

//tìm kiếm sắp xếp phân trang nên viết riêng ra 1 file riêng để xử lý vì có thể dùng lại mấy cái sau
