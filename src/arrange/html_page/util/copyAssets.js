var fs = require("fs");
var path = require("path");
var sep = path.sep;

function copyAssets(ProjectInfo, options) {
  var from_dir = resolveTemplateDir(
    options.html_template_name,
    ProjectInfo.entry_point_dir
  );
  var to_dir = resolveOutDir(options.html_path, ProjectInfo);
  copyRecursively(from_dir, to_dir);
}

function resolveTemplateDir(template_name, entry_point_dir) {
  var dir =
    entry_point_dir +
    "/src/arrange/html_page/templates/" +
    template_name +
    "/assets";
  return dir.replace(/\//g, sep);
}

function resolveOutDir(html_path, ProjectInfo) {
  var ver = ProjectInfo.package_json.version;
  html_path = html_path.replace(new RegExp("@version"), ver);
  if (html_path.startsWith("/"))
    html_path = html_path.substring(1, html_path.length);
  html_path = path.dirname(html_path);
  var dir = ProjectInfo.project_root_dir + "/" + html_path + "/assets";
  return dir.replace(/\//g, sep);
}

function copyRecursively(from_dir, to_dir) {
  //assets might not exist
  if (!fs.existsSync(from_dir)) return;
  var items = fs.readdirSync(from_dir);
  for (var i in items) {
    var item = from_dir + sep + items[i];
    if (fs.statSync(item).isDirectory()) {
      //directory
      copyRecursively(item, to_dir + sep + item[i]);
    } else {
      //file
      mkdirRecursively(to_dir + sep + items[i]);
      fs.copyFileSync(item, to_dir + sep + items[i]);
    }
  }
}

function mkdirRecursively(file_path) {
  file_path = path.dirname(file_path);
  if (!fs.existsSync(file_path)) {
    console.log("created dir:" + file_path);
    fs.mkdirSync(file_path, { recursive: true });
  }
}

module.exports = copyAssets;