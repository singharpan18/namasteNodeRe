const express = require("express");
//require("./config/database");

const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuthNew} = require("./middlewares/auth");

//use this middleware for all request which convert json to js object
app.use(express.json());
app.use(cookieParser());

//

app.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  const user = new User(req.body);

  try{
    await user.save();
    res.send("User added successfully!");
  } catch (err){
    res.status(400).send("Error saving the user" + err.message);
  }
})

app.post("/signup2", async (req, res) => {

  try{
    //validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    })
    await user.save();
    res.send("User added successfully!");
  } catch (err){
    res.status(400).send("ERROR: " + err.message);
  }
})


//get user by email by find one method -> it returns the first created user as object
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try{
    const user = await User.findOne({emailId: userEmail});
    if(!user ){
      res.status(404).send("User not found");
    }else{
      res.send(user);
    }
  }catch(err){
    res.status(400).send("Something went wrong");
  }
});
//get user by email by find  method -> it return all users as array
app.get("/users", async (req, res) => {
  const userEmail = req.body.emailId;
  try{
    const users = await User.find({emailId: userEmail});
    if(users.length === 0){
      res.status(404).send("User not found");
    }else{
      res.send(users);
    }
  }catch(err){
    res.status(400).send("Something went wrong");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Detele a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {

    const ALLOWED_UPDATED = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATED.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
  }
});

// Update data of the user by put
app.put("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

//login api
app.post("/login", async(req, res) => {
  try{
    const { emailId, password} = req.body;
    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password, user.password);
    if(isPasswordValid){
      //create a JWT token
      // const token = await jwt.sign({
      //   _id: user._id}, "DEV@Tinder$790");
      //   //add the token to cookie and send the response back to the user
      //   res.cookie("token", token);

        const token = await user.getJWT();
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
  
        res.send("Login Successful!");
    }else{
      throw new Error("Invalid Credentials");
    }
  }catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
})

//app.get("/profile", async (req, res) => {
app.get("/profile", userAuthNew, async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuthNew, async (req, res) => {
  const user = req.user;
  // Sending a connection request
  console.log("Sending a connection request");

  res.send(user.firstName + "sent the connect request!");
});

connectDB().then(() => {
    console.log("Database connection established....");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });    
})
.catch((err) => {
    console.log("Database cannot be connected...");
});

// app.listen(7777, () => {
//   console.log("Server is successfully listening on port 7777...");
// });

