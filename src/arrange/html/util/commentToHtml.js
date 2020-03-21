var makeName = require("./factory/makeNameElement");
var makeDescription = require("./factory/makeDescriptionElement");
var makeFromTag = require("./factory/makeTaggedElement");
/**
 * 
 * @param {string} name 
 * @param {object} comments
 * @param {object} options 
 * @param {object} ProjectInfo 
 */
function commentToHtml(name,comments,options,ProjectInfo){
  var f = options.html_format;
  var t = ProjectInfo.html_template;
   
}

function tagsToElements(){

}

module.exports = commentToHtml;