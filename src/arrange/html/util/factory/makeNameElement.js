/**
 * make name element of the item.
 * figures out id, class etc.
 * @param {string} name 
 * @param {object} html_template of ProjectInfo
 * @param {object} html_variables of options
 */
function makeNameElement(name,html_template,html_variables){
  var head = "<"+html_variables.item_name+" class=\""+html_template.item_name+">";
  var tale="</"+html_varaibles.item_name+">";
  return head+name+tale;
}

module.exports = makeNameElement;