import groupService from "../service/groupService";
const readFunc = async (req, res) => {
  try {
    let data = await groupService.getGroup({
      order: [["name", "ASC"]], // order
    });
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
};
