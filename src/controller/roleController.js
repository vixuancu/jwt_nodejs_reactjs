import userApiService from "../service/userApiService";
import roleApiService from "../service/roleApiService";
const readFunc = async (req, res) => {
  try {
    let data = await roleApiService.getAllRoles();
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
const createFunc = async (req, res) => {
  try {
    // validate backend chưa làm
    let data = await roleApiService.createNewRoles(req.body);
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
//todo
const updateFunc = async (req, res) => {
  try {
    // validate backend chưa làm
    let data = await userApiService.updateUser(req.body);
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
const deleteFunc = async (req, res) => {
  try {
    //console.log("req.body",req.body);
    let data = await roleApiService.deleteRole(req.body.id);
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
