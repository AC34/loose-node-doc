var makeElement = require("./util/makeElement");
var toHtml = require("./util/commentToHtml");
/**
 * Creates Html from object trree.
 * html rules are defined both by options and ProjectInfo.
 * @param {object} otree
 * @param {object} options
 * @param {object} ProjectInfo
 */
function otreeToHtml(otree, options, ProjectInfo) {
  var html = "";
  for (var name in otree) {
    if (!otree[name].comment) continue;
    html += toHtml(name, otree[name].comment, options, ProjectInfo);
  }
  //wrap
  html = makeElement(
    options.html_format.documentation,
    { id: ProjectInfo.html_template.documentation_id },
    html
  );
  return html;
}
module.exports = otreeToHtml;