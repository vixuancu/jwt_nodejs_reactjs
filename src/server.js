import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();
import bodyParser from "body-parser";
import { createJWT, verifyToken } from "./middleware/JWTAction";
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
//tesst jwt
createJWT();
let decodedData = verifyToken(
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidnhjIiwiYWRkcmVzcyI6Imhvbm9pIiwiaWF0IjoxNzMyMjQzMTc1fQ.UVrQKh8eMl31ZL5G8_ajQQ_32yoysANodcrD1vGHuYI`
);
console.log(decodedData);
// test connection db
// connection();
// init webRoutes
initWebRoutes(app);
initApiRoutes(app);
//

app.listen(PORT, () => {
  console.log("JWT backend is running on the port = ", PORT);
});
