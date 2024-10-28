const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User auth is getting checked !!");
    const token = "abc";
    const isUserAuthorized = token === "abc";
    if(!isUserAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
};

const userAuthNew = async (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).send("Please Login!!");
      }
  
      const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
  
      const { _id } = decodedObj;
  
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User not found");
      }
  
      req.user = user;
      next();
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  };  

module.exports = {
    adminAuth,
    userAuth,
    userAuthNew
};