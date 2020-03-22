/**
 *
 * @param {string} name
 * @param {object} comments
 * @param {object} options
 * @param {object} ProjectInfo
 */
function commentToHtml(name, comments, options, ProjectInfo) {
  var makeElement = require("./makeElement");
  var makeTaggedElement = require("./makeTaggedElement");
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
    if (!comments[i].comment) break;
    ret += makeTaggedElement(comments[i], t, f);
  }
  //wrap by item wrapper
  ret = makeElement(f.item, makeNameId(name, t), "", ret);
  return ret;
}
function makeNameId(name, html_template) {
  var id = name.replace(".", html_template.item_id_dot_replacer);
  return html_template.item_id_prefix + id;
}

module.exports = commentToHtml;
