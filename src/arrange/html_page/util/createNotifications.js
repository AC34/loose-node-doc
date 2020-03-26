var makeElement = require("../../html/util/makeElement");
/**
 * @param {string} html
 * @param {object} options
 * @param {object} ProjectInfo
 * @return {string}
 */
function createNotifications(html, options, ProjectInfo) {
  var n = "";
  var notifications = options.html_notifications;
  for (var i in notifications) {
    n += makeElement(
      options.html_format.notifications,
      {
        class: ProjectInfo.html_template.notification_class
      },
      notifications[i]
    );
  }
  return n;
}
module.exports = createNotifications;