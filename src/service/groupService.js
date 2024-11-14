import db from "../models/index";
const getGroup = async () => {
  try {
    let data = await db.Group.findAll();
    return {
      EM: "",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = {
  getGroup,
};
