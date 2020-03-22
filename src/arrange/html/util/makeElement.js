var trim = require("./trimForHtml");
/**
 * Creates element by given values.
 * id and cls can be an empty string
 * @param {string} element 
 * @param {string} id 
 * @param {string} cls 
 * @param {string} content 
 */
function makeElement(element,id,cls,content){
  var head = "<"+element;
  if(id!=="")head += " id=\""+id+"\"";
  if(cls!=="")head += " cls=\""+cls+"\""
  head +">";
  var tale = "</"+element+">";
  content = trim(content);
  return head+content+tale;
}
module.exports = makeElement;