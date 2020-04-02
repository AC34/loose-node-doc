var makeElement = require("./../../arrange/html/util/makeElement");
/**
 * turns html part into a ready to write html page string.
 * @param {string} html
 * @param {object} options
 * @param {object} ProjectInfo
 * @return {string} html
 */
function createPage(html, options, ProjectInfo) {
  //fetch page template
  var templ = loadTemplate(ProjectInfo, options);
  //assign language
  templ = addLanguage(templ, options);
  //assign titles
  templ = insertTitles(templ,options);
  //assign meta tags
  templ = insertMetas(templ,options,ProjectInfo);
  //assign custom css
  templ = insertCSS(templ,options);
  //assign custom script
  templ = insertScript(templ,options);
  //assign gnavi
  templ = insertGNavi(templ, options, ProjectInfo);
  //assign notifications
  templ = insertNotifications(templ, options, ProjectInfo);
  //assign version
  templ = insertVersion(templ, options, ProjectInfo);
  //assign about_html
  templ = insertAboutHtml(templ, options);
  //html
  templ = insertHtml(templ,html);
  //done
  return templ;
}
/**
 * tries to read template file by user-defined theme.
 * loads default theme when failed.
 * @param {object} ProjectInfo
 * @param {object} options
 * @return {string|boolean} template string or false
 */
function loadTemplate(ProjectInfo, options) {
  var fs = require("fs");
  var sep = require("path").sep;
  var template_path =
    ProjectInfo.entry_point_dir +
    "/src/arrange/html_page/templates/" +
    options.html_template_name +
    "/index.html";
  template_path = template_path.replace(/\//g, sep);
  if (!fs.existsSync(template_path)) {
    return false;
  }
  try {
    var template = fs.readFileSync(template_path, "UTF-8");
    return template;
  } catch (e) {
    return false;
  }
}
/**
 * add lang attribute to html tag
 * @param {string} html 
 * @param {object} options 
 * @return {string} 
 */
function addLanguage(html, options) {
  var pattern = "<html>";
  var rep = "<html lang='" + options.html_format_lang + "'>";
  return html.replace(pattern, rep);
}
/**
 * creates and replaces gnavi section.
 * @param {string} html
 * @param {object} options
 * @param {object} ProjectInfo
 * @return {string} html
 */
function insertGNavi(html, options, ProjectInfo) {
  var createGNavi = require("./util/createGNavi");
  var gnavi = createGNavi(options, ProjectInfo);
  html = html.replace("<!--g-navi-links-->", gnavi);
  return html;
}
/**
 * creates and replaces about section.
 * @param {string} html
 * @param {object} options
 * @param {object} ProjectInfo
 * @return {string} html
 */
function insertNotifications(html, options, ProjectInfo) {
  var createNotifications = require("./util/createNotifications");
  var n = createNotifications(html, options, ProjectInfo);
  html = html.replace("<!--notifications-->", n);
  return html;
}
/**
 * insert version element
 * @param {string} html 
 * @param {object} options 
 * @param {object} ProjectInfo 
 * @return {string} html
 */
function insertVersion(html, options, ProjectInfo) {
  var version = options.html_version_html.replace("@version",ProjectInfo.package_json.version);
  return html.replace("<!--version-->",version);
}
/**
 * @param {string} html 
 * @param {object} options 
 * @return {string} html
 */
function insertAboutHtml(html, options) {
  return html.replace("<!--about_html-->",options.html_about_html);
}
/**
 * @param {string} html 
 * @param {object} options 
 */
function insertCSS(html,options){
  return html.replace("<!--custom_css-->",options.html_custom_css);
}
/**
 * @param {string} html 
 * @param {object} options 
 * @return {string} html
 */
function insertScript(html,options){
  return html.replace("<!--custom_script-->",options.html_custom_script);
}
/**
 * replaces template's main documentaion area with given html
 * @param {string} template 
 * @param {string} html 
 * @return {string} html
 */
function insertHtml(template,html){
  return template.replace("<!--documentation-->",html);
}
/**
 * creates meta tags and placees them. 
 * @param {string} html 
 * @param {object} options 
 * @param {object} ProjectInfo 
 * @return {string} html
 */
function insertMetas(html,options,ProjectInfo){
  var createMetas = require("./util/createMetas");
  var metas = createMetas(options,ProjectInfo); 
  return html.replace("<!--custom_metas-->",metas);
}
/**
 *  
 * @param {string} html 
 * @param {object} options 
 * @param {object} ProjectInfo 
 */
function insertTitles(html,options,ProjectInfo){
  //title tag
  var title = "<title>"+options.html_site_title+"</title>";
  var title_pat = new RegExp("<!--page_title-->","g");
  html =  html.replace(title_pat,title);
  //h1
  var h1 = "<h1>"+options.html_site_title+"</h1>"
  var h1_pat = new RegExp("<!--h1_page_title-->","g");
  return html.replace(h1_pat,h1);
}
module.exports = createPage;