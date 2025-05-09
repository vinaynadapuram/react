// var http=require('http');
// var url=require("url");
// const {MongoClient,ObjectId}=require("mongodb")

// var mongourl = "mongodb://localhost:27017";
// ////connection db
// async function getConnectDb(res){
//     console.log("db connected")
//     try{
//     const client=new MongoClient(mongourl)
//     await client.connect()
//  const db=client.db("mydb")
//  return await db.collection("myusers")

//     }
//     catch{
//         res.end(JSON.stringify({error:"db not connected"}))
//     }
// }
// //http server
// let dbo
// http.createServer(async(req,res)=>{
//     res.writeHead(200,{"Content-Type":"aplication/json"})
// dbo = await getConnectDb()
// const parsedUrl = url.parse(req.url, true);
//       const method = req.method;
//       let body=''
//         try{ 
//             if (method === "GET" ) {
//             const allUsers = await dbo.find().toArray();
//             res.end(JSON.stringify(allUsers));
//             }
// //   POST /users
//           else if (method === "POST") {
//             const data = JSON.parse(body);
//             const result = await dbo.insertOne(data);
//             res.end(JSON.stringify({ message: "User added", id: result.insertedId }));
//           }

        
//           // PUT /user?id=xyz
//           else if (method === "PUT") {
//             const id = parsedUrl.query.id;
//             const data = JSON.parse(body);
//               await dbo.updateOne(
//               { _id: new ObjectId(id) },
//               { $set: data },
//               {}
//             );

//             res.end(JSON.stringify({ message: "User updated" }));
//           }

//           // DELETE /user?id=xyz
//           else if (method === "DELETE") {
//             const id = parsedUrl.query.id;
//             await dbo.deleteOne({ _id: new ObjectId(id) });
//             res.end(JSON.stringify({ message: "User deleted" }));
//           }
        
//           // Not Found
//           else {
//             res.end(JSON.stringify({ message: "Route not found" }));
//           }
//         } catch (error) {
//           res.end(JSON.stringify({ error: error.message }));
//         }
// }).listen(4000, () => {
//     console.log("Server running on http://localhost:4000");
//   });

//   /////////////////////////////////////////////////////old.......
//   var http = require("http");
//   var url = require("url");
  
//   var { MongoClient, ObjectId } = require("mongodb");
  
//   var mongourl = "mongodb://localhost:27017";
//   var client = new MongoClient(mongourl);
//   async function userData() {
//     // Create HTTP server
//     http
//       .createServer(async (req, res) => {
//         // CORS headers
  
//         res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
//         res.setHeader(
//           "Access-Control-Allow-Methods",
//           "GET, POST, PUT,PATCH, DELETE, OPTIONS"
//         );
//         res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//         await client.connect();
//         const db = client.db("mydb");
//         const collection = db.collection("myusers");
//         if (req.method === "OPTIONS") {
//           res.writeHead(204);
//           res.end();
//           return;
//         }
//         const parsedUrl = url.parse(req.url, true);
//         const method = req.method;
//         const path = parsedUrl.pathname;
  
//         // Enable JSON body parsing
//         let body = "";
//         req.on("data", (chunk) => (body += chunk));
//         req.on("end", async () => {
//           try {
//             // GET /users
//             if (method === "GET" ) {
//   ////////search
//               if(path==="/myusers"){
//                   const {name,age,place}=parsedUrl.query
                  
//                   const filter={}
                  
//                   if (name)filter.name=name
//                   if(age)filter.age=age
//                   if(place)filter.place=place
//                   const filteredUsers = await collection.find(filter).toArray();
//                   res.writeHead(200);
//                   res.end(JSON.stringify(filteredUsers));
//                   return;
//               }
//               //////get all
//               const allUsers = await collection.find().toArray();
//               res.writeHead(200);
//               res.end(JSON.stringify(allUsers));
  
              
  
//             }
  
//           //   POST /users
//             else if (method === "POST") {
//               const data = JSON.parse(body);
//               const result = await collection.insertOne(data);
//               res.writeHead(201);
//               res.end(JSON.stringify({ message: "User added", id: result.insertedId }));
//             }
  
          
//             // PUT /user?id=xyz
//             else if (method === "PUT") {
//               const id = parsedUrl.query.id;
//               const data = JSON.parse(body);
//                 await collection.updateOne(
//                 { _id: new ObjectId(id) },
//                 { $set: data },
//                 {}
//               );
  
//               res.writeHead(200);
//               res.end(JSON.stringify({ message: "User updated" }));
//             }
  
//             // DELETE /user?id=xyz
//             else if (method === "DELETE") {
//               const id = parsedUrl.query.id;
//               await collection.deleteOne({ _id: new ObjectId(id) });
//               res.writeHead(200);
//               res.end(JSON.stringify({ message: "User deleted" }));
//             }
          
//             // Not Found
//             else {
//               res.writeHead(404);
//               res.end(JSON.stringify({ message: "Route not found" }));
//             }
//           } catch (error) {
//             res.writeHead(500);
//             res.end(JSON.stringify({ error: error.message }));
//           } finally {
//             client.close();
//           }
//         });
//       })
//       .listen(4000, () => {
//         console.log("Server running on http://localhost:4000");
//       });
//   }
//   userData();
  