/**
 * This file requires templates_lister to update the list before execution.
 */
function langslistUpdater(template){
  var list = require("../../src/outputs/lang/langs_list");
  var embed = listNames(list);
  return template.replace("<!--terminal-langs-->",embed);
}
function listNames(list){
  var names = [];
  //langs list has two levels
  var key1 = Object.keys(list);
  for(var i in key1){
    var key2 = Object.keys(list[key1]);
    for(var k in key2){
      //span is there for avoiding being rendered as url
       names.push("\n - "+key1[i]+"<span></span>."+key2[k]);
    }
  }
  return names;
}

module.exports = langslistUpdater;