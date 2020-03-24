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
  ret += makeElement(
    f.item_name,
    {
      class: t.item_name_class
    },
    name
  );
  //description
  if (comments[0]) {
    ret += makeElement(
      f.item_description,
      {
        class: t.item_description_class
      },
      comments[0]
    );
  }
  //index > 0 are tagged lines
  for (var i in comments) {
    if (i === 0) continue;
    ret += switchByTag(comments[i], t, f);
  }
  //wrap by item wrapper
  ret = makeElement(
    f.item,
    { id: makeNameId(name, t), class: t.item_class },
    ret
  );
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
    return makeExampleElement(comment, html_template, html_format);
  }
  if (comment.tag === "link") {
  }
  if (comment.tag === "trail") {
    return ""; //ignore
  }
  //other tags
  return makeTaggedElement(comment, html_template, html_format);
}
module.exports = commentToHtml;
