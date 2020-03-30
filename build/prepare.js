var fs = require("fs");
var version = require("../package.json").version;

//update languages list
var langs_lister = require("./../src/outputs/lang/langs_lister");

//update options keys list
var options_lister = require("../src/Options/options_lister");

//update templates list
var template_lister = require("../src/arrange/html_page/templates_list/templates_lister");

//edit OPTIONS.md
var options_tmp = fs.readFileSync(__dirname+"/template/OPTIONS.md","UTF-8");
options_tmp = require("./template/templateListUpdater")(options_tmp);
options_tmp = require("./template/langslistUpdater")(options_tmp);

//write down
fs.writeFileSync(__dirname+"/../OPTIONS.md",options_tmp,{encoding:"UTF-8",flags:"w"});

