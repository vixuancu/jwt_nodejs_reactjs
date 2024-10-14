import userService from "../service/userService";
const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};
const handleUserPage = async (req, res) => {
  // model => get data from database
  let userlist = await userService.getUserList();

  return res.render("user.ejs", { userlist });
};
const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  // băm password

  userService.createNewUser(email, password, username);
  // backend bat buoc phai reload page
  return res.redirect("/user");
};
const handleDeleteUser = async (req, res) => {
  // console.log(">>>check id:", req.params.id);
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};
module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
};
