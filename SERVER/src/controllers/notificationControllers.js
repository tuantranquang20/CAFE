exports.getNotification = async (req, res, next) => {
  try {
    console.log("get Notification");
    // res.json(response.success(result, apiCode.SUCCESS.message));
  } catch (error) {
    res.json(response.error(error, apiCode.DB_ERROR.message));
  }
};
