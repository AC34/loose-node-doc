/**
 * This file requires templates_lister to update the list before execution.
 */
function templateListUpdater(template){
  var list = require("../../src/arrange/html_page/templates_list/templates_list");
  var embed = "\n";
  for(var name in list){
    embed +=" - "+name+"\n";
  } 
  return template.replace("<!--templates-list-->",embed);
}

module.exports = templateListUpdater;