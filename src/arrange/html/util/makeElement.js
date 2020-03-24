var trim = require("./trimForHtml");
/**
 * Creates element by given values.
 * id and cls can be an empty string
 * @param {string} element
 * @param {object} attr
 * @param {string} content
 */
function makeElement(element, attrs, content) {
  var head = "<" + element;
  for (var attr in attrs) {
    head += " " + attr + '="' + attrs[attr] + '"';
  }
  head += ">";
  var tale = "</" + element + ">";
  content = trim(content);
  return head + content + tale;
}
module.exports = makeElement;