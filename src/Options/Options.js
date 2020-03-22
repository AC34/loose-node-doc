module.exports = {
  lang: {
    data_type: "string",
    default: "en_US"
  },
  write_object_tree: {
    data_type: "boolean",
    default: false
  },
  //from project root dir
  object_tree_path: {
    data_type: "string",
    default: "out/loose_doc_tree.json"
  },
  write_logs: {
    data_type: "boolean",
    default: false
  },
  //from project root dir
  log_path: {
    data_type: "string",
    default: "out/loose_doc_log.txt"
  },
  //without @
  trail_tag: {
    data_type: "string",
    default: "trail"
  },
  //console
  verbose: {
    data_type: "boolean",
    default: true
  },
  //bool
  enable_default_ignore_paths: {
    data_type: "boolean",
    default: true
  },
  ignore_paths: {
    data_type: "array",
    default: []
  },
  ignore_objects: {
    data_type: "array",
    default: []
  },
  //from project root
  package_json_path: {
    data_type: "string",
    default: "package.json"
  },
  //from root
  html_path:{
    data_type:"string",
    default:"out/@version/index.html"
  },
  html_template_name: {
    data_type: "string",
    default: "four-six-blue"
  },
  //title,h1,meta:ogp
  html_site_title:{
    data_type:"string",
    default:"my page"
  },
  html_site_description:{
    data_type:"string",
    default:""
  },
  html_gnavi_links:{
    datatype:"array",
    default:{
      "home":"index.html"
    }
  },
  html_notifications:{
    data_type:"array",
    default:[]
  },
  html_about_html:{
    data_type:"string",
    default:"<p>about html here</p>"
  },
  //replaces first occurance of @version with version string.
  html_version_html:{
    data_type:"string",
    default:"<p>version:@version</p>"
  },
  html_custom_css:{
    data_type:"string",
    default:""
  },
  html_custom_script:{
    data_type:"string",
    default:""
  },
  //for html
  //all values can use @version,@homepage 
  html_meta:{
    data_type:"object",
    default:{
      keywords:"",
      description:"this is description of my package of version:@verseion",
      author:"ac34",
      og_site_name:"www.example.com",
      og_url:"",
      og_image:"",
      custom_html:""
    }
  },
  html_format: {
    data_type: "object",
    default: {
      lang:"en",
      g_navi: "div",
      documentation:"div",
      //expecting ul or ol
      g_navi_list: "ul",
      notifications:"p",
      item: "dl",
      item_name: "dt",
      item_description: "dd",
      item_details:"div",
      item_details_item:"dd",
      example: "code"
    }
  }
};
