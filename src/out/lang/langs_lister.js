//this file does not need to be included in npm distribution package.
//This file only needs to be called before publishing.
/**
 * parses directories and files and generates langs_list.js.This is for loading supported languages by user's code editors so that they can be notified what languages are supported, and can use them without typo.
 * langs_list.js will be generated at same dir where this file is.
 */
//preparation
var fs = require("fs");
var sep = require("path").sep;
var langs = {};
var file = __dirname + sep + "langs_list.json";

//start
var langs = createLangNamesObject();
//console.log("languages eumearted:"+JSON.stringify(langs));
langs = enumerateLanguages(langs);
console.log("languages eumearted:"+JSON.stringify(langs));
//write
fs.writeFileSync(file,JSON.stringify(langs,null,"\t"),{encoding:"utf-8",flags:"w"});

/**
 * language names object with empty objects.
 * e.g. {en:{},ja:{}}
 */
function createLangNamesObject(){
  var items = fs.readdirSync(__dirname);
  var list = {};
  for(var item in items){
    var path = items[item];
    //ignoring files
    if(fs.statSync(__dirname+sep+path).isFile())continue;
    //allow two characters directories only
    if(path.length!==2)continue;
    //allow lowercases only
    if(path.toLowerCase()!==path)continue;
    //append with assinging an empty object.
    list[path] = {};
  }
  return list;
}
function enumerateLanguages(langs_object){
  for(var lang in langs_object){
    var items = fs.readdirSync(__dirname+sep+lang);
    for(var item in items){
      var path = items[item];
      console.log("enumerated langs:"+path);
      //country files are always two_letters upper cases with .js
      //dot needs to be at positon 2
      if(path.indexOf(".")!==2)continue;
      var country = path.split(".")[0];
      //upper cases
      if(country.toUpperCase()!==country)continue;
      //trailing with .js
      if(!path.endsWith(".js"))continue;
      //create option value
      var val = lang+"_"+country;//e.g. en_US
      //add
      langs_object[lang][country] = val;
    }
  }
  return langs_object;
}


