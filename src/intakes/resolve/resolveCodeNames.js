/**
 * match codes and adds .name attribute to objects_tree
 * @param {object} objects_tree of traverseCache.js
 * @param {object} obj_names of traverseObjectNames.js
 */
function resolveCodeNames(objects_tree, obj_names) {
  for (var code_name in objects_tree) {
    //console.log("exports:"+typeof objects_tree[code_name].exports);
    //code is stringified
    if (typeof objects_tree[code_name].exports === "string") {
      var name = matchCode(objects_tree[code_name].exports, obj_names);
      //false or name
      if (name !== false) {
        //console.log("matched:"+name);
        objects_tree[code_name].name = name;
      }
    }
  }
  return objects_tree;
}
/**
 *
 * @param {string} code
 * @param {object} obj_names
 * @return {string|false} matched
 */
function matchCode(code, obj_names) {
  for (var name in obj_names) {
    if (obj_names[name].code) {
      if (obj_names[name].code === code) return name;
    }
  }
  return false;
}

module.exports = resolveCodeNames;
