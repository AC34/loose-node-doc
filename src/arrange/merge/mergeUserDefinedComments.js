/**
 * @param {object} otree 
 * @return {object} otree
 */
function mergeUserDefinedComments(otree) {
  //salvage comments
  var parsed = parseComments(otree);

  //merge objects
  return Object.assign({},otree,parsed);
}
/**
 * @param {object} otree 
 * @return {object} loaded_comments
 */
function parseComments(otree){
  var parse = require("./util/parseComment");
  var parsed = {};
  for(var name in otree){
    var comments = parse(otree[name]);
    if(Object.keys(comments).length>0){
      parsed = Object.assign(otree,comments);
    }
  }
  return parsed;
}

module.exports = mergeUserDefinedComments;