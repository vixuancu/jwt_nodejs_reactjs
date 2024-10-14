import bcrypt from "bcryptjs";
// Get the client
import mysql from "mysql2/promise";
import Bluebird from "bluebird";
// Create the connection to database

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });

  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email,password,username) VALUES (?,?,?)",
      [email, hashPass, username]
    );
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
    const [rows, fields] = await connection.execute("SELECT * FROM users");
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
      "DELETE FROM users WHERE id=(?)",
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
      "SELECT * FROM users WHERE id=(?)",
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
      "UPDATE users set email = ?,username = ? WHERE id=?",
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
