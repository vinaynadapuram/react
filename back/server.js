
import http from "http";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import { URL } from "url";
import employeRouter from "./routers.js";
import {connectDB} from './db.js'
import cros from "cors";
import bodyParser from "body-parser";
import url from 'url'
///////express code connecting to db to till ends///////////
// 1. Mongoose (for products)
connectDB()

// 2. Express App (for /products routes)
const app = express();
app.use(express.json());
app.use(cros());
app.use(bodyParser.json()); // handles application/json
app.use(bodyParser.urlencoded({ extended: true })); // handles form data

// Express Routes
app.use("/employee", employeRouter);

/////////////////////////end express connection code//////////////


/////////////////////node js connection code start//////////////////////////
// var mongourl = "mongodb://localhost:27017";
var mongourl= "mongodb+srv://teluguskillhubnodejs:fGowGziEXJ45osYy@cluster0.hf9t506.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
////connection db"
async function getConnectDb(res) {
  console.log("db connected");
  try {
    const client = new MongoClient(mongourl);
    await client.connect();
    const db = client.db("mydb");
    return db.collection("myusers");
  } catch {
    res.end(JSON.stringify({ error: "db not connected" }));
  }
}
//http server
let dbo;
 const server=http
  .createServer(async (req, res) => {
    // res.writeHead(200,"success",{"content-type":"application.json"})

    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT,PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(200,"success",{"content-type":"application.json"})
      res.end();
      return;
    }
const urlObj = new URL(req.url, `http://${req.headers.host}`);
  
    // Delegate to Express if route starts with /products
    if (urlObj.pathname.startsWith("/employee")) {
      app(req, res); // 👈 hand off to Express
      return;
    }


    dbo = await getConnectDb();
    const parsedUrl = url.parse(req.url, true);
  
  
    const method = req.method;
    
    let body = "";
      req.on("data", (chunk) => (body += chunk));

     req.on("end", async () => {

    try {
      if (method === "GET") {
        if(req.url.includes("/myusers")
        ){
          
          searchData(parsedUrl,res)
          return
        }
        getAll(res);
      }
      //   POST /users
      else if (method === "POST") {
        postData(res,body);
      }
      // PUT /user?id=xyz
      else if (method === "PUT") {
        updateData(res, parsedUrl, body);
      }

      // DELETE /user?id=xyz
      else if (method === "DELETE") {
        deleteData(res,parsedUrl);
      }

      // Not Found
      else {
        res.end(JSON.stringify({ message: "Route not found" }));
      }
    } catch (error) {
      res.end(JSON.stringify({ error: error.message }));
    }

    });
  })
// Start the unified server
server.listen(4000, () => {
  console.log("Combined server running at http://localhost:4000");
});

//get all
async function getAll(res) {
  try{
  const allUsers = await dbo.find().toArray();
  res.end(JSON.stringify(allUsers));
  
}catch(error){
    console.log(error);
  }
    
}

//postdata
async function postData(res, body) {
  const data = JSON.parse(body);
  const result = await dbo.insertOne(data);
  res.end(JSON.stringify({ message: "User added", id: result.insertedId }));

}
//put
async function updateData(res, parsedUrl, body) {
  const id = parsedUrl.query.id;
  const data = JSON.parse(body);
  await dbo.updateOne({ _id: new ObjectId(id) }, { $set: data }, {});

  res.end(JSON.stringify({ message: "User updated" }));

}
//delete
async function deleteData(res, parsedUrl) {
  const id = parsedUrl.query.id;
  await dbo.deleteOne({ _id: new ObjectId(id) });
  res.end(JSON.stringify({ message: "User deleted" }));

}
///search
async function searchData(parsedUrl,res) 
{
  const {name,age,place}=parsedUrl.query 
  console.log(parsedUrl.query);
  const filter={}
  if (name)filter.name=name
  if(age)filter.age=age
  if(place)filter.place=place
  const filteredUsers = await dbo.find(filter).toArray();
  res.end(JSON.stringify(filteredUsers,{ message: "User updated" }));

   
}

