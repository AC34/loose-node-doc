var fs = require("fs");
var sep = require("path").sep;
var target = __dirname+sep+"templates_list.js";
var prefix="module.exports = {\n";
var suffix="\n};\n";

//start
templates_lister();

function templates_lister(){
  var root = __dirname+sep+"../templates";
  var list = fs.readdirSync(root);
  for(var i in list){
    var path = list[i];
    if(!fs.statSync(root+sep+path).isDirectory()){
      delete list[i];
    }
  }
  writeList(list);
}
function writeList(list){
  var str = prefix;
  for(var i in list){
    str += "\""+list[i]+"\":\""+list[i]+"\"";
    if(list+1<list.length)str+=",";
  }
  str += suffix;
  fs.writeFileSync(target,str,"UTF-8");
}

module.exports = templates_lister;