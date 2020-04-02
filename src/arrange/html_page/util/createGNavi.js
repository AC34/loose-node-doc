var makeElement = require("./../../html/util/makeElement");
/**
 * Creates gnavi based on options.html_gnavi_links. if there is no link, the empty string is returned.
 * @param {object} options 
 * @param {object} ProjectInfo 
 * @return {string} gnavi_html
 */
function createGNavi(options,ProjectInfo){
  var f = options.html_format;
  var t = ProjectInfo.html_template;
  var list = options.html_gnavi_links;
  if(Object.keys(list).length===0)return "";
  list = createList(list); 
  if(list==="")return "";//abort on empty
  list = makeElement(f.g_navi_list,{
    id:t.g_navi_ul_id
  },list);
  return list;
}
function createList(list){
  var ret = "";
  for(var name in list){
    var a = "<a href=\""+list[name]+"\""+">"+name+"</a>";
    var a = makeElement("a",{
      href:list[name],
      target:"_blank"
    },name);
    ret += makeElement("li",{},a);
  }
  return ret;
}
module.exports = createGNavi;