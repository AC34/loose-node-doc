var makeElement = require("./makeElement");
/**
 * converts tag lines to html.
 * @param {string} taglines
 * @param {object} html_template
 * @param {object} html_variables
 * @param {string} html
 */
function makeTaggedElement(taglines, html_template, html_format) {
  //at least parameter type needs to exist
  if (taglines.tag === "" || !taglines.tag) return "";
  var ret = "";
  ret += makeElement(html_format.item_details_item, {}, taglines.tag);
  //types
  //only if exists
  if (taglines.types) {
    ret += makeDataTypeElement(taglines.types, html_template, html_format);
  }
  //name of the parameter
  if (taglines.name) {
    ret += makeElement(html_format.item_details_item, {}, taglines.name);
  }
  //wrap with details
  ret = makeElement(html_format.item_details, {
    class:html_template.item_details_class
  }, ret);
  return ret;
}
function makeDataTypeElement(types, html_template, html_format) {
  //types is either string or array
  //reformat as an array
  if (typeof types === "string") types = [types];
  var ret = "";
  //turn them into an element
  for (var i in types) {
    ret += makeElement(html_format.item_details_datatype, {}, types[i]);
  }
  //wrap
  ret = makeElement(
    html_format.item_details_datatypes,
    {
      class: html_template.item_details_datatypes_class
    },
    ret
  );
  return ret;
}

module.exports = makeTaggedElement;