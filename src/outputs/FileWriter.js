var fs = require("fs");
var sep = require("path").sep;

/**
 * instantiates iwth root dir.
 * root_dir should not end with neither slash nor directory separator.
 * @param {string} project_root_dir
 */
function FileWriter(project_root_dir) {
  var rd = project_root_dir;
  if (rd.endsWith(sep)) rd = rd.substring(0, rd.length - 2);
  this.root_dir = rd;
}
/**
 * returns error or true.
 * @param {string} log_path
 * @param {array} logs
 * @return {boolean|string} true or error message
 */
FileWriter.prototype.writeObject = function(file_path, object) {
  var data = JSON.stringify(object, null, "\t");
  assureDirExistance(file_path);
  try {
    fs.writeFileSync(file_path, data, { encoding: "utf8", flags: "w" });
    return true;
  } catch (e) {
    return e;
  }
};
/**
 * returns error or true.
 * @param {string} log_path
 * @param {array} logs
 * @return {boolean|string} true or error message
 */
FileWriter.prototype.writeText = function(log_path, logs) {
  logs = logs.join("\n");
  assureDirExistance(log_path);
  try {
    fs.writeFileSync(log_path, logs, { encoding: "utf8", flags: "w" });
    return true;
  } catch (e) {
    return e;
  }
};
/**
 * Tell if path is somewhat writable path.
 * empty, missing file attribute,is directory, will be false.
 * @param {string} path
 * @return {boolean} writable
 */
FileWriter.prototype.isWritablePath = function(file_path) {
  var path = require("path");
  //empty
  if (!file_path) return false;
  if (file_path === "") return false;
  //missing extension name
  var ext = path.extname(file_path);
  if (ext === "") return false;
  return true;
};
/**
 *
 * @param {file_path} file_path
 */
function assureDirExistance(file_path) {
  if (file_path.lastIndexOf(".") > -1) {
    var dir = require("path").dirname(file_path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }, function(err) {
        console.log(err);
      });
    }
  }
}
/**
 *
 * @param {file_path} file_path
 */
FileWriter.prototype.getAbsolutePath= function(file_path) {
  //fix dir
  if (file_path.startsWith("./")) file_path = file_path.replace("./", "");
  if (file_path.startsWith("/")) file_path = file_path.replace("/", "");
  file_path = file_path.split("/");
  var dir = this.root_dir.split(sep);
  return dir.concat(file_path).join(sep);
}

module.exports = FileWriter;
