var getMessages = require("loose-node-doc/src/Options/getMessages");
var validateOptions = require("./src/Options/validateOptions");
var fs = require("fs");
//traverses down object tree and finds object information
var traverseObjectNames = require("loose-node-doc/src/util/traverse/traverseObjectNames");
//reads cache hisotry and returns its list
var traverseCache = require("loose-node-doc/src/util/traverse/traverseCache");
//deletes certain paths from traverseCache() result
var ignorePaths = require("loose-node-doc/src/util/ignore/ignorePaths");
//ignores names starting with given list item
var ignoreObjects = require("loose-node-doc/src/util/ignore/ignoreObject");
//resolve objct tree sources
var resolveObjectDependencies = require("loose-node-doc/src/util/resolve/resolveObjectDependencies");
//fetches code's own name
var resolveCodeNames = require("loose-node-doc/src/util/resolve/resolveCodeNames");
//tries to salvage comment block from files
var resolveCodesFiles = require("loose-node-doc/src/util/resolve/resolveCodeFiles");
//reads all the files from the cache tree of traverseCache()
var loadAllRequiredFiles = require("loose-node-doc/src/util/IO/loadAllRequiredFiles");
//locate where comments are in the files list, and stores them to the otree
var resolveComments = require("loose-node-doc/src/util/resolve/resolveComments");
var parseComments = require("./src/util/parse/parseComments");
getProjectRootDir();
/**
 * LND(loose-node-doc).
 */
function LND() {}
/**
 * Creates html document output.
 * @param {*} out_path
 * @param {object}
 */
LND.generate = function(object, options) {
  //initial values
  if (!options) options = {};
  this.options = { verbose: true };
  this.logs = [];
  //first of all, the system needs messages
  //anything that requires LND can now access LND.messages
  this.messages = getMessages(options, this);
  //initializing options(updating and checking)
  this.options = validateOptions(options, this);
  if (this.options.verbose === true) {
    this.log(this.messages["process-options-loaded"]());
  }
  if (!object) {
    this.log(this.messages["empty-object"]());
    this.log(this.messages["process-stopped"]());
    return;
  } else {
    this.log(this.messages["process-object-loaded"]());
  }

  //path objects pair
  var obj_names = traverseObjectNames(object);
  var names_count = Object.keys(obj_names).length;
  if (names_count === 0) {
    this.log(this.messages["object-names-empty"]());
    this.log(this.messages["process-stopped"]());
    return;
  } else {
    this.log(
      this.messages["process-object-names-loaded"](
        Object.keys(obj_names).length
      )
    );
  }
  //ignore object names by given ignore list
  obj_names = ignoreObjects(obj_names, this.options.ignore_objects);
  if (this.options.verbose === true) {
    this.log(
      this.messages["process-ignored-objects"](
        names_count - Object.keys(obj_names).length
      )
    );
  }

  //traverses require cache and returns an array
  //{"path":{exports[names/codes],parent},...}
  var cache_tree = traverseCache();
  if (this.options.verbose === true) {
    if (Object.keys(cache_tree).length === 0) {
      this.log(this.messages["empty-cache"]());
      this.log(this.messages["process-stopped"]());
      return;
    } else {
      var num = Object.keys(cache_tree).length;
      this.log(this.messages["process-traversed-caches"](num));
    }
  }

  //removes files by pre defined paths array
  if (this.options.enable_default_ignore_paths === true) {
    //console.log("default ignores:"+this.options.default_ignore_paths);
    cache_tree = ignorePaths(
      cache_tree,
      this.options.default_ignore_paths,
      getProjectRootDir()
    );
  }

  //removes files by user defined array
  if (this.options.ignore_paths) {
    var before = Object.keys(cache_tree).length;
    cache_tree = ignorePaths(
      cache_tree,
      this.options.ignore_paths,
      getProjectRootDir()
    );
    if (this.options.verbose === true) {
      var ignored_num = before - Object.keys(cache_tree).length;
      this.log(this.messages["process-ignored-paths"](ignored_num));
    }
  }
  fs.writeFileSync(
    __dirname + "/tmp/ctree.json",
    JSON.stringify(cache_tree, null, "\t")
  );

  //fs.writeFileSync("./build/tmp/obj_names.json",JSON.stringify(obj_names,null,"\t"));
  //this file needs to be called directly
  var build_path = getBuildScriptPath();
  //traverses caches tree and resolve
  //{"name":{path,exports[codes/objects]},...}
  var otree = resolveObjectDependencies(build_path, cache_tree, obj_names);
  fs.writeFileSync(
    __dirname + "/tmp/rotree.json",
    JSON.stringify(otree, null, "\t"),
    { encoding: "utf8", flag: "w" }
  );

  //{"name":{path,exports[codes/objects],name},...}
  otree = resolveCodeNames(otree, obj_names);

  //update otree with position and filename
  var all_files = loadAllRequiredFiles(cache_tree);

  otree = resolveCodesFiles(otree, all_files);
  otree = resolveComments(otree, all_files);
  otree = parseComments(otree);
  if (this.options.verbose === true) {
    var count = countOtreeComment(otree);
    if (count === 0) {
      this.log(this.messages["zero-comments-resolved"]());
    } else {
      this.log(this.messages["process-resolved-comments"](count));
    }
  }
  fs.writeFileSync(
    __dirname + "/tmp/otree.json",
    JSON.stringify(otree, null, "\t"),
    { encoding: "utf8", flag: "w" }
  );
};
/**
 * logging method.
 */
LND.log = function(message) {
  this.logs.push(message);
  if (this.options.verbose === true) {
    console.log(message);
  }
};
/**
 * this file is meant to be called from build script.
 */
function getBuildScriptPath() {
  var trace = new Error().stack.split("\n")[3];
  //removing brackets
  trace = trace.substring(trace.indexOf("(") + 1, trace.lastIndexOf(")"));
  //there arae two semi colons from the tail of the path
  //and there can be zero or one semi colons from head, depending on OS.
  trace = trace.substring(0, trace.lastIndexOf(":"));
  trace = trace.substring(0, trace.lastIndexOf(":"));
  return trace;
}
/**
 * returns root project folder name.
 * does not end with directory separator.
 * @return {string} dir_name
 */
function getProjectRootDir() {
  //isnt always guaranteed to be node_modules
  var path = __dirname;
  var sep = require("path").sep;
  path = path.split(sep);
  path.pop();
  path.pop();
  path = path.join(sep);
  return path;
}
/**
 *
 * @param {object} otree
 * @param {string} key
 */
function countOtreeComment(otree) {
  var count = 0;
  for (var name in otree) {
    if (otree[name].comment) {
      count++;
    }
  }
  return count;
}
LND.dumpLog = function() {};
LND.dumpObjectTree = function() {};

module.exports = LND;
