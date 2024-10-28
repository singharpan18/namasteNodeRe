const express = require("express");

const app = express();

//app.use("/route", rH, [rH2, rH3], rH4, rh5);
//multiple route-handlers
/*app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2!!");
    // res.send("2nd Response!!");
    next();
  },

  (req, res, next) => {
    console.log("Handling the route user 3!!");
    // res.send("3rd Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4!!");
    // res.send("4th Response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 5!!");
    res.send("5th Response!!");
  }
);*/

//writing-auth-middleware -> instead of writing auth call before each api call we have created auth middleware and used it
/*const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

//for login authentication is not required
app.post("/user/login", (req, res) => {
  res.send("User logged in successfully!!");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User data sent!!");
});*/

//error handling
app.use("/", (err, req, res, next) => {
  if(err){
    //log your error
    res.Status(500).send("Something went wrong");
  }
});

app.get("/getUserDta", (req, res) => {
  try{
    //logic to db call and get user data
  }catch(err){
    res.status(500).send("Some error contact support team");
  }
});

//add this in last if anythin wrong happens which is not handle this error will display
app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error
    res.status(500).send("something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});

