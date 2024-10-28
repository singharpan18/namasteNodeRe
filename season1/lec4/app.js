require("./xyz.js");//one module into other

//const calculateSum = require("./sum.js");
//const obj = require("./sum.js");
// const {x, calculateSum} = require("./sum.js");
// const {calculateMultiply} = require("./multiply.js");

const {calculateMultiply, calculateSum} = require("./calculate");

var name = "Namaste Node";

var a = 10;
var b = 20;

//calculateSum(a,b);

// obj.calculateSum(a, b);
// console.log(obj.x);

calculateSum(a, b);
//console.log(x);

calculateMultiply(a, b);

console.log(globalThis === global);