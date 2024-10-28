//connecting to cluster
const mongoose = require("mongoose");
//it returns us a promise and tells us weather connection was established successfully or not, so we should use asyc wait so it wait until the response comes, once response comes handle it accordingly

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://singharpan9748:FOzGAqlAsmk7gR5u@namastenode.zncny.mongodb.net/devTinder");
};


//connectDB function is getting called and it is returing promise and we are handling it using then
/*connectDB().then(() => {
    console.log("Database connection established....");
})
.catch((err) => {
    console.log("Database cannot be connected...");
});*/

module.exports = connectDB;
//It looks like the issue in your code is that you're calling connectDB() when exporting it, which means the function is executed 
//immediately when the module is imported. This is causing the promise to be resolved before it is actually used in your server.js 
//or app.js file.
//You should export the connectDB function itself, not the result of calling it.


