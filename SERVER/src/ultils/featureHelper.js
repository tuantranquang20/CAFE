exports.newRequestBody = (payload) => {
  const result = payload.map((el) => {
    let obj = {
      idItem: el.idItem._id,
      sumPrice: el.sumPrice,
      qty: el.qty,
      description: el.description,
    };
    let arrObj = Object.assign({}, obj);
    return arrObj;
  });
  return result;
};
