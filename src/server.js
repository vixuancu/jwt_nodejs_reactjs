import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";

const app = express();

// config view engine
configViewEngine(app);

// config body-parser phải thêm trước cái hàm initWebRoutes(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// init webRoutes
initWebRoutes(app);
//
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("JWT backend is running on the port = ", PORT);
});
