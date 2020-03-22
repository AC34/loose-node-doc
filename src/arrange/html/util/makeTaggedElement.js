var makeElement = require("./makeElement");
/**
 * converts tag lines to html.
 * @param {string} taglines 
 * @param {object} html_template 
 * @param {object} html_variables 
 * @param {string} html
 */
function makeTaggedElement(taglines,html_template,html_format){
  //at least parameter type needs to exist
  if(taglines.tag===""||!taglines.tag)return "";
  var ret = "";
  ret += makeElement(html_format.item_details_item,"","",taglines.tag);
  //only if exists
  if(taglines.types===""){
    ret += makeDataTypeElement(item_details_item.types,html_template,html_variables);
  }
  //name of the parameter
  if(taglines.name===""){
    ret += makeElement(html_format.item_details_item,"",html_template.item_details_class,taglines.name);
  }
  //wrap with details
  ret = makeElement(html_format.item_detials,"",html_template.item_details_class,ret);
  console.log("tagged:"+ret);
  return ret;
}

function makeDataTypeElement(types,html_template,html_variables){

}

module.exports = makeTaggedElement;