import express from "express";
// import { connectDB } from "./db.js";
import cros from "cors";
import employeRouter from "./routers.js";
import bodyParser from "body-parser";
// import { nodehttp } from "./server.js";

const app = express();
const port = 4000;

//middleware
app.use(express.json()); // for parsing JSON bodies
app.use(cros());
app.use(bodyParser.json()); // handles application/json
app.use(bodyParser.urlencoded({ extended: true })); // handles form data
app.use("/employee", employeRouter);
// app.use("/node", nodehttp)
//db connection


// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.listen(port, () => {
  console.log("helloworld");
});
