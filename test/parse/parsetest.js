var parser = require("loose-node-doc/src/util/resolve/parse/parseComment");

var mock1 = require("fs").readFileSync(__dirname+"/mock1.txt","UTF-8");
mock1 = parser(mock1);

var mock2 = require("fs").readFileSync(__dirname+"/mock2.txt","UTF-8");
mock2 = parser(mock2);
var mock3 = require("fs").readFileSync(__dirname+"/mock3.txt","UTF-8");
mock3 = parser(mock3);

var result ={mock1,mock2,mock3};
require("fs").writeFileSync(__dirname+"/result.json",JSON.stringify(result,null,"  "),{encoding:"utf-8"});
console.log(result);
