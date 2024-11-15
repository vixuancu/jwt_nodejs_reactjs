import { where } from "sequelize/lib/sequelize";
import db from "../models/index";
import {
  checkEmailExist,
  checkPhoneExist,
  hashUserPassword,
} from "./loginRegisterService";
const getAlluser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    }); // dùng điều kiện nếu users null không lỗi
    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};
const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      order: [["id", "DESC"]], // order
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "get data success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
  }
};
const createNewUser = async (data) => {
  try {
    // check email. phone number
    // check email/phone number are exist
    let isEmailExit = await checkEmailExist(data.email);
    if (isEmailExit) {
      return {
        EM: "the email is already exist",
        EC: 1, // chu y doan nay
        DT: "email",
      };
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist) {
      return {
        EM: "the phone number is already exist",
        EC: 1,
        DT: "phone",
      };
    }

    // hash user password
    let hashPassword = hashUserPassword(data.password);

    // hash userpassword
    await db.User.create({ ...data, password: hashPassword });
    return {
      EM: "created success",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};
const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "Error with GroupId empty",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "Update User success",
        EC: 0,
        DT: "",
      };
    } else {
      //not found
      return {
        EM: "User not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service updateUser",
      EC: 1,
      DT: "",
    };
  }
};
const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
      await user.destroy();
      return {
        EM: "Delete data success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "user not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: "",
    };
  }
};
module.exports = {
  getAlluser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
