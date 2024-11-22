import jwt from "jsonwebtoken";
require("dotenv").config();
const createJWT = () => {
  let payload = { name: "vxc", address: "honoi" };
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }

  console.log("token:", token);
};
const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  return data;
  //   jwt.verify(token, key, function (err, decoded) {
  //     if (err) {
  //       console.log(err);
  //       return data;
  //     }

  //     return decoded;
  //   });
};
module.exports = {
  createJWT,
  verifyToken,
};
