/**
 * creates metatags by opitons and  options.html_meta 
 * ignores if given values are empty
 * @param {string} html 
 * @param {object} options 
 * @param {object} ProjectInfo 
 * @return {string} html
 */
function createMetas(html,options,ProjectInfo){
  var pi = ProjectInfo;
  var hm = options.html_meta;
  var metas = "";
  //metas
  metas += makeMeta("keywords",hm.keywords,pi);
  metas += makeMeta("description",hm.description,pi);
  metas += makeMeta("author",hm.author,pi);
  //ogp
  metas += makeOgpMeta("site_name",hm.og_site_name,pi);
  metas += makeOgpMeta("title",options.html_site_title,pi);
  metas += makeOgpMeta("description",options.html_site_description,pi);
  metas += makeOgpMeta("type","website",pi);
  metas += makeOgpMeta("url",hm.og_url,pi);
  metas += makeOgpMeta("image",hm.og_image,pi);
  //custom
  metas += replacenPatterns(hm.custom_html,pi);
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
  var hp = ProjectInfo.package_jsono.homepage;
  if(!hp)return str;//abort on empty
  str = str.replace(hp_pat,hp);
  return str;
}
module.exports = createMetas;