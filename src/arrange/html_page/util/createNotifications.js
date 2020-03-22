var makeElement = require("../../html/util/makeElement");
/**
 * @param {string} html
 * @param {object} options
 * @param {object} ProjectInfo
 * @return {string}
 */
function createNotifications(html, options, ProjectInfo) {
  var n = "";
  for (var i in notifications) {
    n += makeElement(
      options.html_format.notification,
      "",
      ProjectInfo.html_template.notification_class,
      notifications[i]
    );
  }
  return n;
}

module.exports = createAbout;
