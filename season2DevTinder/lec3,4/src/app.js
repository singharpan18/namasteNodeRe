const express = require("express");

const app = express();

//create a sever
//app.listen(console.log("Server is successfull running"));

// This will only handle GET call to /user
// app.get("/user", (req, res) => {
//     res.send({ firstName: "Akshay", lastName: "Saini" });
//   });  

//Explore routing and use of ?, + , ()?, * in the routes
//Use of regex in routes /a/ , /.*fly$/
app.get(/.*fly$/, (req, res) => {
   res.send({ firstName: "Akshay", lastName: "Saini" });
 });  

//reading data from params
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({ firstName: "Akshay", lastName: "Saini" });
  });
  
app.post("/user", (req, res) => {
    console.log(req.body);
    // saving data to DB
    res.send("Data successfully saved to the database!");  
  })

  app.delete("/user", (req, res) => {
    res.send("Deleted successfully!");
  });
  
//write request handlers for /test, /hello
// this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
    res.send("Hello from test server");
});

// app.use("/hello", (req, res) => {
//     res.send("hello from hello server....");
// });

// app.use("/", (req, res) => {
//     res.send("from /....");
// })


//listen to port no 7777
app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777......")
});
