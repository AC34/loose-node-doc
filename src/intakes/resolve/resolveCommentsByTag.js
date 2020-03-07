/**
 * Iteratsee through all files and locates comments. then tries to salvage comments including @{tag name}.
 * tag meaning options.trail_tag(default "trail")
 * @param {string} otree
 * @param {object} files of loadAllRequiredfiles.js
 * @param {string} tag
 */
function resolveCommentsByTag(otree, files, tag) {
  //join all scriopt to make a big string.
  var joined_script = Object.values(files).join("\n");
  var comments = salvageComments(joined_script); 
  var formed = formNamesObject(comments,tag);
  return assignComments(otree,formed);
}
/**
 * lists comments from given string.
 * parses only multiline comments
 * @param {string} file
 * @param {string} tag
 * @param {array} list
 * @return {arrary} list of comments
 */
function salvageComments(str, list = []) {
  var start = str.indexOf("/*");
  var end = str.indexOf("*/");
  //quit on no more legit match
  if (start === -1 || end === -1) return list;
  //trim unnecesssary heading
  //str = str.substring(str.substring(0, start));
  //substring
  var comment = str.substring(start, end + 2);
  //avoiding duplicates
  if(!list.includes(comment))list.push(comment);
  //delete current comment
  str = str.substring(end+1,str.length-1);
  //continue recursively
  return salvageComments(str, list);
}
/**
 * Re-forms comments list to names list.
 * reutrn value will be {name:{comment:(salvaged comment list)}}
 * comments missing tag will simply be ignored.
 * If there is a collision on names, then first name is prioritized.
 * @param {array} comments
 * @param {string} tag
 */
function formNamesObject(comments, tag) {
  var back = {}; 
  for(var i in comments){
    var name = parseTag(comments[i],tag);
    if(name!==""){
      back[name] = comments[i];
    };
  }
  return back;
}
/**
 * finds @tag in comment, then returns the string after tag name.
 * @param {string} comment 
 * @param {string} tag 
 */
function parseTag(comment,tag){
  var start = comment.indexOf(tag);
  if(start>0){
    //trim the head
    var head_trimmed = comment.substring(start,comment.length-1);
    //avoiding tag itself
    head_trimmed = head_trimmed.substring(head_trimmed.indexOf(" ")+1,head_trimmed.length-1);
    //remove tag itself
    //then find end position
    //both \r\n and \n returns pos
    var end = head_trimmed.indexOf("\r\n")>0||head_trimmed.indexOf("\n");
    return head_trimmed.substring(0,end);
  }
  return "";
}
/**
 * Assigns otree[name].comment values.
 * Does not override existing comment.
 * Does assign new name if otree does not have it already.
 * @param {object} otree 
 * @param {ojbect} formed 
 * @return {object} otree merged
 */
function assignComments(otree,formed) {
  for(var name in formed){
    //assign new name
    if(!otree[name]){
      otree[name] = {comment:formed[name]};
      continue;
    }
    //assign comment only if empty
    if(!otree[name].comment){
      otree[name].comment = formed[name];
    }
  }
  return otree;
}

module.exports = resolveCommentsByTag;
