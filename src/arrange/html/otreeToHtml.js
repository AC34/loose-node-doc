/**
 * Creates Html from object trree.
 * html rules are defined both by options and ProjectInfo.
 * @param {*} otree 
 * @param {*} options 
 * @param {*} ProjectInfo 
 */
function otreeToHtml(otree,options,ProjectInfo){
  var toHtml = require("./util/commentToHtml");
  for(var name in otree){
    if(!otree[name].comment)continue;
    otree[name].comment = toHtml(name,otree[name].comment,options,ProjectInfo);
  }
}

module.exports = otreeToHtml;