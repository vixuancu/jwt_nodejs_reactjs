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
const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassword(password);
  connection.query(
    `INSERT INTO users (email,password,username) VALUES (?,?,?)`,
    [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};
const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
  });
  let users = [];
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    // console.log("check rows", rows);
    return rows;
  } catch (error) {
    console.log("check error", error);
  }
};
module.exports = {
  createNewUser,
  getUserList,
};
