var makeElement = require("./makeElement.js");
/**
 * creates example element.
 * containing name,description wrapped by div.
 * @param {object} comment
 * @param {object} html_template
 * @param {object} html_format
 * @return {string} html
 */
function makeExampleElement(comment, html_template, options) {
  var cap = extractCaption(comment.description);
  if (cap !== "") {
    cap = replaceCaption(cap, options,html_template);
  }
  var code = makeElement(
    options.html_format_example,
    {},
    avoidCaption(comment.description)
  );
  var example = makeElement(
    options.html_format_example_wrap,
    {
      class:html_template.item_example_class
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
function replaceCaption(str, options,html_template) {
  var head_pt = new RegExp("<caption>", "g");
  var head_rp = "<"+options.html_format_example_caption+" class=\""+html_template.item_example_caption_class+"\">";
  var tale_pt = new RegExp("</caption>", "g");
  var tale_rp = "</" + options.html_format_example_caption + ">";
  str = str.replace(head_pt, head_rp);
  str = str.replace(tale_pt, tale_rp);
  return str;
}

module.exports = makeExampleElement;