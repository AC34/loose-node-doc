const obj_types = {
  unknown:-1,
  value:"value",
  object:"object",
  function:"function" 
}

function ObjModel(name,actual_name,type,code){
  this.name = name;
  this.actual_name = actual_name;
  this.type = type;
  this.code = code;
  this.source = "";
  return this;
}

function createObjectTree(prefix,obj,tree){
  if(prefix===undefined)prefix==="";
  if(obj===undefined)return {};
  var keys = Object.keys(obj);
  for(var key in keys){
    var name = prefix===""?keys[key]:prefix+"."+keys[key];
    //keep adding recursively
    if(typeof obj[keys[key]] === "object"){
      createObjectTree(name,obj[keys[key]],tree);
    }
    else if(typeof obj[keys[key]] === "function"){
      //source code is returned 
      tree[name] = new ObjModel(keys[key],obj[keys[key]].name,obj_types.function,obj[keys[key]].toString());
    }
    else{
      tree[name] = new ObjModel(keys[key],keys[key].name,obj_types.value,obj[keys[key]]);
    }
  }
  return tree;
}
//interface
function createTreeInterface(obj){
  var tree = {};
  tree = createObjectTree("",obj,tree);
  return tree;
}

module.exports = createTreeInterface;