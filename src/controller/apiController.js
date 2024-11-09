const testApi = (req, res) => {
  return res.status(200).json({
    message: "oke",
    data: "test api",
  });
};
module.exports = {
  testApi,
};
