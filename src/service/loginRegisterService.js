import bcrypt from "bcryptjs";
import db from "../models/index";
import { where } from "sequelize/lib/sequelize";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (user) {
    return true;
  }
  return false;
};
const checkPassword = (inputPassword, hashPassword) => {
  // Load hash from your password DB.
  return bcrypt.compareSync(inputPassword, hashPassword); // true
};
const handleUserLogin = async (rawData) => {
  try {
    // check email/phone number are exist

    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    if (user) {
      console.log("found user with email/phone");
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        return {
          EM: "OK", //
          EC: 0, //
          DT: "",
        };
      }
    }

    console.log(
      "Input user with email/phone",
      rawData.valueLogin,
      "password:",
      rawData.password
    );
    return {
      EM: "Your email/phone number or password is incorrect", // khong nen bao loi cu the
      EC: 1, // chu y doan nay
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs in service ...",
      EC: -2,
    };
  }
};
const registerNewUser = async (rawUserData) => {
  try {
    // check email/phone number are exist
    let isEmailExit = await checkEmailExist(rawUserData.email);
    if (isEmailExit) {
      return {
        EM: "the email is already exist",
        EC: 1, // chu y doan nay
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist) {
      return {
        EM: "the phone number is already exist",
        EC: 1,
      };
    }

    // hash user password
    let hashPassword = hashUserPassword(rawUserData.password);
    // create new user
    await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      username: rawUserData.username,
      password: hashPassword,
    });
    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs in service ...",
      EC: -2,
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
};
