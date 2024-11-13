import userApiService from "../service/userApiService";
const readFunc = async (req, res) => {
  try {
    // dùng req.query
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      //console.log("check data:", "page=", page, "limit=", limit);
      let data = await userApiService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, //error code
        DT: data.DT, // data
      });
    } else {
      let data = await userApiService.getAlluser();
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, //error code
        DT: data.DT, // data
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from sever", // error message
      EC: -1, //error code
      DT: "", // data
    });
  }
};
const createFunc = async (req, res) => {
  try {
    let users = await userApiService.createNewUser();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from sever", // error message
      EC: -1, //error code
      DT: "", // data
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    let users = await userApiService.updateUser();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from sever", // error message
      EC: -1, //error code
      DT: "", // data
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    //console.log("req.body",req.body);
    let data = await userApiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, //error code
      DT: data.DT, // data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from sever", // error message
      EC: -1, //error code
      DT: "", // data
    });
  }
};
module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
