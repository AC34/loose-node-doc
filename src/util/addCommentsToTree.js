/**
 * tries to extract comments from given files.
 * empty strings are stored on failures.
 * @param {object} tree
 * @param {array} files
 */
function addCommentsToTree(tree) {
  //load files here, instead of loading at index
  var files = [];
  //load files
  files = loadFiles(files);
  var code_parser = require("./parser/salvageCommentByCode");
  //console.log("files:"+JSON.stringify(files,null,"\t"));
  for (var key in tree) {
    var path = tree[key].path;
    if (!files[path]) continue;
    //function
    var is_func = isFunction(tree[key].exports);
    if (is_func===true) {
      tree[key].comment === code_parser(tree[key].exports, files[path]);
    }
  }
}
/**
 * loads all files.
 * file keys should be given by relative paths from project root.
 * However, returning keys are absolute paths.
 * @param {*} files
 */
function loadFiles(files) {
  var fs = require("fs");
  var resolve = require("path").resolve;
  var ret = {};
  for (var i in files) {
    var absolute_path = resolve(files[i]);
    ret[absolute_path] = fs.readFileSync(absolute_path, "UTF-8");
  }
  return ret;
}
function isFunction(function_string) {
  //try creating function out of string
  try {
    //ok, so function string cannot be an object but can be instantiated. others can be both or neither.
    //0 is however processed as function by this method, thus avoiding ahead
    if(function_string===0)return false;
    //function cannot be an object(cannot be parsed)
    if(tryToObjectify(function_string))return false;
    //throws error on fail
    var func = new Function(function_string);
    //must be able to be function
    var is_func = typeof func === "function" ? true : false;
    return is_func;
  } catch (e) {
    return false;
  }
}
function tryToObjectify(str){
    try {
      var j = JSON.parse(str);
      return j?true:false;
    } catch (e) {
      return false;
    }
}
module.exports = addCommentsToTree;
