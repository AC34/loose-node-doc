var makeElement = require("./makeElement");
var makeTaggedElement = require("./makeTaggedElement");
var makeExampleElement = require("./makeExampleElement");
/**
 * @param {string} name
 * @param {object} comments
 * @param {object} options
 * @param {object} ProjectInfo
 */
function commentToHtml(name, comments, options, ProjectInfo) {
  var f = options.html_format;
  var t = ProjectInfo.html_template;
  var ret = "";
  //name
  ret += makeElement(f.item_name, "", t.item_name_class, name);
  //description
  if (comments[0]) {
    ret += makeElement(
      f.item_description,
      "",
      t.item_description_class,
      comments[0]
    );
  }
  //index > 0 are tagged lines
  for (var i in comments) {
    if (i === 0) continue;
    ret += switchByTag(comments[i], t, f);
  }
  //wrap by item wrapper
  ret = makeElement(f.item, makeNameId(name, t), t.item_class, ret);
  return ret;
}
function makeNameId(name, html_template) {
  var id = name.replace(".", html_template.item_id_dot_replacer);
  return html_template.item_id_prefix + id;
}
function switchByTag(comment, html_template, html_format) {
  if (!comment.tag) return "";
  //example
  if (comment.tag === "example") {
    return makeExampleElement(comment,html_template,html_format);
  }
  return makeTaggedElement(comment, html_template, html_format);
}
module.exports = commentToHtml;
