var lnd = require(__dirname+"/../../entry_point");
var dxlb = require(__dirname+"/../../../../dxl-builder");

console.log("templating start:");
var options = {
  "html_template_name":"4-6-red"
};
lnd.generate(dxlb,options);