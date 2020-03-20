var fs = require("fs");
/**
 * return valule may be an empty object or following:
 * {
 *  name:{comments:{}},
 *  name:{comments:{}}
 * }
 * @param {object} otree_object 
 * @return {object}
 */
function parseComment(otree_object){
  if(!otree_object.filename)return {};
  var file_string = "";
  try{
    file_string = fs.readFileSync(otree_object.filename,"UTF-8");
  }catch(e){
    return {};
  }
  var comments = fetchComments(file_string);
  return comments;
}
/**
 * Collects all the multiline comments
 * comment needs to be multiline comments.  
 * return value will be an empty object or following:
 * {
 * comment:"comment str"
 * comment:"comment str"
 * }
 * comment contains comment patternsitself.
 * @param {string} file_string 
 * @return {array} locations
 */
function fetchComments(file_string){
  var str = file_string;
  var comments= [];
  var proceed = true;
  //trim heading string
  if(str.indexOf("/*")>0){
    str = str.substring(0,str.indexOf("/*"));
  }
  while(proceed){
    //locate multiline comments
    var start = str.indexOf("/*");
    var end = str.indexOf("*/");
    //quit on no position
    if(start===-1 || end == -1){
      proceed = false;
      break;
    }
    //wrong comments within file, then abort
    if(start>end){
      proceed = false;
      break;
    }
    //add
    var comment = str.substring(start,end+2);
    comments.push(comment);
    //update
    str = str.substring(end+2,str.length-1);
  }
  return comments;
}

module.exports = parseComment;