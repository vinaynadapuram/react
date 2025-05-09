import http from "http";
import express from "express";
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";
import { URL } from "url";
import employeRouter from "./routers.js";
// const employeRouter=require('./routers')
// 1. Mongoose (for products)
mongoose.connect("mongodb://localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// 2. Express App (for /products routes)
const expressApp = express();
expressApp.use(express.json());

// Express Routes
expressApp.use("/employee", employeRouter);

// expressApp.get("/products", async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// expressApp.post("/products", async (req, res) => {
//   const newProduct = new Product(req.body);
//   const saved = await newProduct.save();
//   res.status(201).json(saved);
// });


// 3. Node native HTTP routes (for /users)
const client = new MongoClient("mongodb://localhost:27017");
const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }
  
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
  
    // Delegate to Express if route starts with /products
    if (urlObj.pathname.startsWith("/employee")) {
      expressApp(req, res); // 👈 hand off to Express
      return;
    }
  
    // Native Node.js /users handler
    await client.connect();
    const db = client.db("mydb");
    const users = db.collection("myusers");
  
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      if (req.method === "GET" && urlObj.pathname === "/node") {
        const allUsers = await users.find().toArray();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(allUsers));
      }
  
      else if (req.method === "POST" && urlObj.pathname === "/node") {
        const data = JSON.parse(body);
        const result = await users.insertOne(data);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ insertedId: result.insertedId }));
      }
  
      else {
        res.writeHead(404);
        res.end("Not Found");
      }
    });
  });
  
  // Start the unified server
  server.listen(4000, () => {
    console.log("Combined server running at http://localhost:4000");
  });
  