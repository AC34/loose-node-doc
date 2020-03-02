//just quick tests
//require modules
var lnd = require("../../entry_point");
//dxl-builder
var dxlb = require("../../../../dxl-builder");

console.log("empty test start:");
lnd.generate();  
console.log("empty test end:");

console.log("en_US legit reading start:");
lnd.generate({},{lang:"en_US"});  
console.log("en_US legit reading end:");

console.log("unsupprted ja_JP reading start:");
lnd.generate({},{lang:"ja_JP"});  
console.log("unsupprted ja_JP reading end:");

console.log("missing underscore start:");
lnd.generate({},{lang:"en-US"});  
console.log("missing underscore end:");

console.log("wrong type start:");
lnd.generate({},{lang:1234});  
console.log("wrong type end:");

