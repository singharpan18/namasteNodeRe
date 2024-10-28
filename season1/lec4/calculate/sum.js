//modules protect their variables and functions from leaking for using it in other module export it and then import
console.log("namste node sum module executed");

var x = "Hello World";

function calculateSum(a, b){
    const sum = a + b;
    console.log(sum);
}

//module.exports = calculateSum;

// module.exports = {
//     x: x,
//     calculateSum: calculateSum,
// };
console.log(module.exports);//output {}
//module.exports.x = x;
module.exports =  {x, calculateSum};