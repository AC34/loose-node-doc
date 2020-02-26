//var dxlb = require("../dxl-builder");
var fs = require("fs");
var lister = require("./src/util/listFilesRecursive");
var ignoreFiles = require("./src/util/ignoreFiles");
var ignoreObjects = require("./src/util/parser/ignoreObjects");
//reads cache hisotry and returns its list
var traverseCache = require("./src/util/traverseCache");
//var traverseModuleTree = require("./src/util/traverseModuleTree");
//traverseModuleTree();

var dxlb = require("../dxl-builder");
//console.log("req_tree:"+global.module_tree);
fs.writeFileSync("./build/tmp/req_tree.json",JSON.stringify(global.module_tree,null,"\t"));

//resolve objct tree sources
var resolveObjectTreeSources = require("./src/util/obsolete/resolveObjectTreeSources");
var resolveObjectDependencies = require("./src/util/resolveObjectDependencies");
var addCommentsToTree = require("./src/util/addCommentsToTree");

//list all project files recursively
//relative path from project root
var files = lister([
  "./dxl-builder.js",
  "./dxl-builder"
]);

//ignoring list by object names
var ignore_objects = [
  "util.fs",
];

//ignoring list by file names
var ignore_paths = [
  "./build/",
  "./node_modules/",
  "./dxl-builder/interfaces/time/object/php"
];

//files = ignoreFiles(files,ignore_paths);
//fs.writeFileSync("./build/list.json",JSON.stringify(files,null,"\t"));

//traverses require cache and returns an array
var cache_tree = traverseCache();
cache_tree = ignoreFiles(cache_tree,ignore_paths);
fs.writeFileSync("./build/tmp/ctree.json",JSON.stringify(cache_tree,null,"\t"));

//traverses caches tree
var obj_tree = resolveObjectDependencies(cache_tree);
fs.writeFileSync("./build/tmp/otree.json",JSON.stringify(obj_tree,null,"\t"));
var obj_tree = addCommentsToTree(obj_tree,files);
