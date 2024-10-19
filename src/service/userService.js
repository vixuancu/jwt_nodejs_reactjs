import bcrypt from "bcryptjs";
// Get the client
import mysql from "mysql2/promise";
import Bluebird from "bluebird";
import db from "../models/index";
import { where } from "sequelize/lib/sequelize";
// Create the connection to database

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);

  try {
    await db.User.create({
      email: email,
      password: hashPass,
      username: username,
    });
  } catch (error) {
    console.log("check error >>", error);
  }
};
const getUserList = async () => {
  // test relationship
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"],
    include: { model: db.Group, attributes: ["name", "description"] },
    raw: true,
    nest: true,
  });
  let roles = await db.Role.findAll({
    include: { model: db.Group, where: { id: 1 } },

    raw: true,
    nest: true,
  });
  console.log("check new user", newUser);
  console.log("check new Roles", roles);

  let users = [];

  users = await db.User.findAll();
  return users;
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  // });
  // try {
  //   const [rows, fields] = await connection.execute("SELECT * FROM user");
  //   // console.log("check rows", rows);
  //   return rows;
  // } catch (error) {
  //   console.log("check error", error);
  // }
};
const deleteUser = async (userId) => {
  await db.User.destroy({
    where: {
      id: userId,
    },
  });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id=(?)",
  //     [id]
  //   );
  //   // console.log("check rows", rows);
  //   return rows;
  // } catch (error) {
  //   console.log("check error", error);
  // }
};
const getUserById = async (userId) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: userId,
    },
  });
  return user;
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "SELECT * FROM user WHERE id=(?)",
  //     [id]
  //   );
  //   // console.log("check rows", rows);
  //   return rows;
  // } catch (error) {
  //   console.log("check error", error);
  // }
};
const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    {
      email: email,
      username: username,
    },
    {
      where: { id: id },
    }
  );
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user set email = ?,username = ? WHERE id=?",
  //     [email, username, id]
  //   );
  //   // console.log("check rows", rows);
  //   return rows;
  // } catch (error) {
  //   console.log("check error", error);
  // }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
