var makeElement = require("./util/makeElement");
/**
 * Creates Html from object trree.
 * html rules are defined both by options and ProjectInfo.
 * @param {object} otree
 * @param {object} options
 * @param {object} ProjectInfo
 */
function otreeToHtml(otree, options, ProjectInfo) {
  var html = "";
  var toHtml = require("./util/commentToHtml");
  for (var name in otree) {
    if (!otree[name].comment) continue;
    html += toHtml(name, otree[name].comment, options, ProjectInfo);
  }
  //wrap
  html = makeElement(
    options.html_format.documentation,
    ProjectInfo.html_template.documentation_id,
    "",
    html
  );
  return html;
}

module.exports = otreeToHtml;