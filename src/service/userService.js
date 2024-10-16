import bcrypt from "bcryptjs";
// Get the client
import mysql from "mysql2/promise";
import Bluebird from "bluebird";
import db from "../models/index";
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
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM user");
    // console.log("check rows", rows);
    return rows;
  } catch (error) {
    console.log("check error", error);
  }
};
const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });
  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM user WHERE id=(?)",
      [id]
    );
    // console.log("check rows", rows);
    return rows;
  } catch (error) {
    console.log("check error", error);
  }
};
const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });
  try {
    const [rows, fields] = await connection.execute(
      "SELECT * FROM user WHERE id=(?)",
      [id]
    );
    // console.log("check rows", rows);
    return rows;
  } catch (error) {
    console.log("check error", error);
  }
};
const updateUserInfor = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });
  try {
    const [rows, fields] = await connection.execute(
      "UPDATE user set email = ?,username = ? WHERE id=?",
      [email, username, id]
    );
    // console.log("check rows", rows);
    return rows;
  } catch (error) {
    console.log("check error", error);
  }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
