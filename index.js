/**
 * LND(loose-node-doc).
 */
function LND() {
  this.files_to_ignore = [];
  this.objects_to_ignore = [];
}
/**
 * Creates html document output.
 * @param {*} out_path
 */
LND.generate = function(out_path) {
  if(typeof out_path==="string"){
    console.log("out_path is not type of string."+typeof out_path+" was given.");
    return;
  }
  var fs = require("fs");
  var ignoreFiles = require("./src/util/ignoreFiles");
  var ignoreObjects = require("./src/util/parser/ignoreObjects");

  //reads cache hisotry and returns its list
  var traverseCache = require("./src/util/traverseCache");

  //var dxlb = require("./dxl-builder");
  //console.log("req_tree:"+global.module_tree);
  fs.writeFileSync(
    "./build/tmp/req_tree.json",
    JSON.stringify(global.module_tree, null, "\t")
  );

  //resolve objct tree sources
  var resolveObjectTreeSources = require("./src/util/obsolete/resolveObjectTreeSources");
  var resolveObjectDependencies = require("./src/util/resolveObjectDependencies");
  var addCommentsToTree = require("./src/util/addCommentsToTree");

  //list all project files recursively
  //relative path from project root
  var files = lister(["./dxl-builder.js", "./dxl-builder"]);

  //ignoring list by object names
  var ignore_objects = ["util.fs"];

  //ignoring list by file names
  var ignore_paths = [
    "./build/",
    "./node_modules/",
    "./dxl-builder/interfaces/time/object/php"
  ];
  //traverses require cache and returns an array
  var cache_tree = traverseCache();
  cache_tree = ignoreFiles(cache_tree, ignore_paths);
  fs.writeFileSync(
    "./build/tmp/ctree.json",
    JSON.stringify(cache_tree, null, "\t")
  );
  //traverses caches tree
  var obj_tree = resolveObjectDependencies(cache_tree);
  fs.writeFileSync(
    "./build/tmp/otree.json",
    JSON.stringify(obj_tree, null, "\t")
  );
  var obj_tree = addCommentsToTree(obj_tree, files);
}
/**
 * files and directories to ignore.
 * relative paths from project directory.
 * @param {array} paths
 */
LND.ignoreFiles = function(paths) {
  if (!Array.isArray(paths)) {
    //fail
  }
  this.files_to_ignore = paths;
};
LND.ignoreObjects = function(object_names) {
  if (!Array.isArray(object_names)) {
    //fail
  }
  this.objects_to_ignore = object_names;
};
module.exports = LND;
