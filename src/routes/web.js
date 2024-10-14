import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

// express app
const initWebRoutes = (app) => {
  // path , handler
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/user/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateUser);

  return app.use("/", router);
};

export default initWebRoutes;
