import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
const app = express();

// config view engine
configViewEngine(app);
// init webRoutes
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("JWT backend is running on the port = ", PORT);
});
