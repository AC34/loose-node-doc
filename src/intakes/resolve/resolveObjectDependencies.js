/**
 * reconstruts path tree to object tree.
 * @param {object} cache_tree result of traverseCache.js
 * @return {object} merged tree
 */
function resolveObjectDependencies( cache_tree, obj_names) {
  var tree_names = listTreeNames(obj_names);
  //adds parent and childeren infos
  var root_obj = constructRootObject(cache_tree);
  var tree = startReconstruction(root_obj, cache_tree, tree_names);
  return tree;
}
/**
 * Merges merges root
 * avoids build_script to be root.
 * @param {object} caches
 */
function constructRootObject(caches) {
  var root_obj = {};
  var sources = [];
  var children = [];
  var exports = {};
  for(var path in caches){
    //add if parent does not exist
    if(!caches[path].parent){
      sources.push(path);
      children = children.concat(caches[path].children);
      exports = Object.assign(exports,caches[path].exports);
    }
  }
  root_obj.sources = sources;
  root_obj.children = children;
  root_obj.exports = exports;
  return root_obj;
}
/**
 * @param {object} root_obj
 * @param {object} caches
 * @param {array} tree_names a list of usable nested object names
 */
function startReconstruction(root_obj, caches, tree_names) {
  var tree = {};
  console.log("root paths:" + JSON.stringify(root_obj.sources, null, "\t"));
  for (var i in root_obj.sources) {
    var source = root_obj.sources[i];
    tree = Object.assign(
      tree,
      traverseExports("", source, caches, tree, tree_names)
    );
  }
  return tree;
}
/**
 * tree{path_string:{path:other}}
 * @param {string} prefix
 * @param {array} parent_candidates
 * @param {object} caches
 * @param {object} tree
 * @param {array} tree_names
 */
function traverseExports(prefix, parent_path, caches, tree, tree_names) {
  var item = caches[parent_path];
  for (var key in item.exports) {
    var new_prefix = prefix !== "" ? prefix + "." + key : key;
    //Proceed if such pattern of name exists.
    if (!tree_names.includes(new_prefix)) continue;
    //console.log("prefix:" + new_prefix);
    var ex = item.exports[key];
    //initialize
    tree[new_prefix] = {};
    tree[new_prefix].type = typeof ex;
    if (typeof ex === "object") {
      //no children then ignore
      var children = item.children;
      if (!children) continue;
      for (var i in children) {
        if (caches[children[i]]) {
          tree = Object.assign(
            tree,
            traverseExports(new_prefix, children[i], caches, tree, tree_names)
          );
        }
      }
    } else {
      if (typeof ex === "function") {
        tree[new_prefix].exports = ex.toString(); //function
      } else {
        tree[new_prefix].exports = ex; //value
      }
    }
  }
  return tree;
}
/**
 * extracts tree_names and returns as an array.
 * @param {object} obj_names
 * @return {array} tree_names
 */
function listTreeNames(obj_names) {
  var list = [];
  for (var i in obj_names) {
    if (obj_names[i].tree_name) {
      list.push(obj_names[i].tree_name);
    }
  }
  return list;
}
module.exports = resolveObjectDependencies;
