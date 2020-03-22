/**
 * Creates Html from object trree.
 * html rules are defined both by options and ProjectInfo.
 * @param {*} otree 
 * @param {*} options 
 * @param {*} ProjectInfo 
 */
function otreeToHtml(otree,options,ProjectInfo){
  var html = "";
  var toHtml = require("./util/commentToHtml");
  for(var name in otree){
    if(!otree[name].comment)continue;
    html += toHtml(name,otree[name].comment,options,ProjectInfo);
  }
  return html;
}

module.exports = otreeToHtml;