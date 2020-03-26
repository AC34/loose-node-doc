var makeElement = require("./makeElement.js");
/**
 * creates example element.
 * containing name,description wrapped by div.
 * @param {object} comment
 * @param {object} html_template
 * @param {object} html_format
 * @return {string} html
 */
function makeExampleElement(comment, html_template, html_format) {
  var cap = extractCaption(comment.description);
  if (cap !== "") {
    cap = replaceCaption(cap, html_format);
  }
  var code = makeElement(
    html_format.exampke,
    {},
    avoidCaption(comment.description)
  );
  var example = makeElement(
    html_format.example_wrap,
    {
      class: html_template.item_example_class
    },
    cap + code
  );
  return example;
}

function extractCaption(str) {
  var cap = "</caption>";
  if (str.indexOf(cap) === -1) return "";
  return str.substring(0, str.indexOf(cap) + cap.length);
}
function avoidCaption(str) {
  var cap = "</caption>";
  if (str.indexOf(cap) === -1) return str;
  return str.substring(str.indexOf(cap) + cap.length, str.length);
}

/**
 * @param {string} str
 * @return {string} str
 */
function replaceCaption(str, html_format) {
  var head_pt = new RegExp("<caption>", "g");
  var head_rp = "<" + html_format.example_caption + ">";
  var tale_pt = new RegExp("</caption>", "g");
  var tale_rp = "</" + html_format.example_caption + ">";
  str = str.replace(head_pt, head_rp);
  str = str.replace(tale_pt, tale_rp);
  return str;
}
module.exports = makeExampleElement;