var lnd = require(__dirname+"/../../entry_point");

var dxlb = require(__dirname+"/../../../../dxl-builder");

console.log("illegal option key start:");
var options = {
  "a-key-does-not-exist":true
};
lnd.generate(dxlb,options);
console.log("illegal option key end:\n");

console.log("illegal option type start:");
options = {
  "verbose":1234,
};
lnd.generate(dxlb,options);
console.log("illegal option type end:\n");

console.log("verbose start:");
options = {
  "verbose":true,
};
lnd.generate(dxlb,options);
console.log("verbose end:\n");

console.log("quiet start:");
options = {
  "verbose":false,
};
lnd.generate(dxlb,options);
console.log("quiet end:\n");

console.log("ignore objects start:");
options = {
  "ignore_objects":["util.fs"]
};
lnd.generate(dxlb,options);
console.log("ignore objects end:\n");

console.log("ignore paths start:");
options = {
  "enable_default_ignore_paths":false,
  "ignore_paths":["node_modules"]
};
lnd.generate(dxlb,options);
console.log("ignore paths end:\n")
