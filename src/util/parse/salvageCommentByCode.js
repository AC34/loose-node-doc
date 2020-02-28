/**
 * 
 * @param {string} code_str 
 * @param {string} file 
 * @return {string} string asssumed as comment
 */
function parseCommentByCode(code_str,file_str){
  var ret = "";
  //console.log("code_str:"+code_str);
  //console.log("file_str:"+file_str);
  var salvage_point = file_str.indexOf(code_str);

  //console.log("sal:"+salvage_point);
  return ret;
}

function locateComments(file_str){
  
}

module.exports = parseCommentByCode;