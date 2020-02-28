
function createObjectTree(prefix,obj,tree){
  if(obj===undefined)return {};
  var keys = Object.keys(obj);
  for(var key in keys){
    if(!tree[keys[key]])tree[keys[key]] = {};
    var new_prefix = prefix ===""?keys[key]:prefix+"."+keys[key];
    //keep adding recursively
    if(typeof obj[keys[key]] === "object"){
      createObjectTree(new_prefix,obj[keys[key]],tree);
    }
    //function needs to be stringified
    else if(typeof obj[keys[key]] === "function"){
      tree[keys[key]].code = obj[keys[key]].toString();
    }
    //finally
    tree[keys[key]].tree_name = new_prefix;
  }
  return tree;
}
//interface
/**
 * returns {fuction_name:{code:(raw code)},...}
 * @param {object} array of target objects
 * @return object
 */
function traverseObjectNames(object){
  return createObjectTree("",object,{});
}

module.exports = traverseObjectNames;