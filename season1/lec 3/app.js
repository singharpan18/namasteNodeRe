var name = "Namaste NodeJS";

var a = 10;
var b = 20;
console.log(name);
console.log(a+b);
//for executing this jst write node app.js in terminal
console.log(global);
//global is not part of the V8 JS engine, it is the some super power provided by node js
//it gives access to u setTimeOut, setInterval etc
console.log(this);//output empty object
//in node js global and this is not same

//bt in browsers -> window, this,  self, frames will give same bt in global bt gives u error
//finally globalThis comes which gives same for browser as well as for node js

console.log(globalThis);
console.log(globalThis === global); // output true



