/**
 * trims unncessary characters
 * @param {string} comment_string
 */
function trimForHtml(comment_string){
  var cs = comment_string.trim();
  if(comment_string.startsWith("\\r\\n"))cs = cs.replace("\\n",""); 
  if(comment_string.startsWith("\\n"))cs = cs.replace("\\n"); 
  if(comment_string.endsWith("\\r\\n"))cs = cs.substring(0,cs.length-4); 
  if(comment_string.endsWith("\\n"))cs = cs.substring(0,cs.length-2); 
  return cs;
}

module.exports = trimForHtml;