/**
 * 
 * @param {object} otree 
 * @param {objcet} otree
 */
function parseComments(otree){
  var parser = require(__dirname+"/parseComment");
  for(var name in otree){
    if(otree[name].comment){
      otree[name].comment = parser(otree[name].comment);
    }
  }
  return otree;
}

module.exports = parseComments;