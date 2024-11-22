import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;
// config Cors
configCors(app);
// config view engine
configViewEngine(app);

// config body-parser phải thêm trước cái hàm initWebRoutes(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//config cookie
app.use(cookieParser());
// test connection db
// connection();
// init webRoutes
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
  return res.send("404 not found");
});
app.listen(PORT, () => {
  console.log("JWT backend is running on the port = ", PORT);
});
