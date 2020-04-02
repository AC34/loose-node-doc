/**
 * creates metatags by opitons and  options.html_meta_*
 * ignores if given values are empty
 * @param {string} html 
 * @param {object} options 
 * @param {object} ProjectInfo 
 * @return {string} html
 */
function createMetas(options,ProjectInfo){
  var pi = ProjectInfo;
  var metas = "";
  //metas
  metas += makeMeta("keywords",options.html_meta_keywords,pi);
  metas += makeMeta("description",options.html_meta_description,pi);
  metas += makeMeta("author",options.html_meta_author,pi);
  //ogp
  metas += makeOgpMeta("site_name",options.html_meta_og_site_name,pi);
  metas += makeOgpMeta("title",options.html_site_title,pi);
  metas += makeOgpMeta("description",options.html_site_description,pi);
  metas += makeOgpMeta("type","website",pi);
  metas += makeOgpMeta("url",options.html_meta_og_url,pi);
  metas += makeOgpMeta("image",options.html_meta_og_image,pi);
  //custom
  metas += replacenPatterns(options.html_meta_custom_html,pi);
  return metas;
}
function makeMeta(name,content,ProjectInfo){
  if(content==="")return "";
  content = replacenPatterns(content,ProjectInfo);
  return "<meta name='"+name+"' content='"+content+"'>\n";
}
function makeOgpMeta(property,content,ProjectInfo){
  if(content==="")return "";
  content = replacenPatterns(content,ProjectInfo);
  return "<meta property='og:"+property+"' content='"+content+"'>\n";
}
/**
 * currently supports:
 * version,homepage
 * @param {string} str
 * @param {object} options 
 * @return {string}
 */
function replacenPatterns(str,ProjectInfo){
  //@version
  var version_pat = new RegExp("@version","g");
  var version = ProjectInfo.version;
  str = str.replace(version_pat,version);
  //@homepage
  var hp_pat = new RegExp("@homepage","g");
  var hp = ProjectInfo.package_json.homepage;
  if(!hp)return str;//abort on empty
  str = str.replace(hp_pat,hp);
  return str;
}
//extracts html_meta_* values only
function extractHtmlMetas(options){
  var ret = {};
  for(var key in options){
    if(key.startsWith("html_meta")){
      ret[key] = options[key];
    }
  }
  return ret;
}
module.exports = createMetas;