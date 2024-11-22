import {
  registerNewUser,
  handleUserLogin,
} from "../service/loginRegisterService";
const testApi = (req, res) => {
  return res.status(200).json({
    message: "oke",
    data: "test api",
  });
};
const handleRegister = async (req, res) => {
  try {
    // req.body: email,phone username,password
    if (
      !req.body.email ||
      !req.body.phone ||
      !req.body.username ||
      !req.body.password
    ) {
      return res.status(200).json({
        EM: "Missing required parameters", // error message
        EC: 1, //error code
        DT: "", // data
      });
    }
    if (req.body.password && req.body.password.length < 6) {
      return res.status(200).json({
        EM: "your pass word more than 6 letters", // error message
        EC: 1, //error code
        DT: "", // data
      });
    }
    //service :create user
    let data = await registerNewUser(req.body); // loi o day
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, //error code
      DT: "", // data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from sever", // error message
      EC: -1, //error code
      DT: "", // data
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    let data = await handleUserLogin(req.body);
    // set cookie
    res.cookie("jwt", data.DT.access_token, {
      httpOnly: true,
      maxAGE: 60 * 60 * 1000,
    });
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, //error code
      DT: data.DT, // data
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever", // error message
      EC: -1, //error code
      DT: "", // data
    });
  }
};
module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
