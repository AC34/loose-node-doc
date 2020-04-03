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
  html_path: {
    data_type: "string",
    default: "out/@version/index.html"
  },
  html_template_name: {
    data_type: "string",
    default: "4-6-blue"
  },
  //title,h1,meta:ogp
  html_site_title: {
    data_type: "string",
    default: "my project documentation"
  },
  html_site_description: {
    data_type: "string",
    default: "my project's documentation page."
  },
  html_notifications: {
    data_type: "array",
    default: ["this is notification 1."]
  },
  html_gnavi_links: {
    data_type: "object",
    default: {
      "self": "./"
    }
  },
  html_about_html: {
    data_type: "string",
    default: "<p>This is my documentation.</p>"
  },
  //replaces first occurance of @version with version string.
  html_version_html: {
    data_type: "string",
    default: "<p>version:@version</p>"
  },
  html_custom_css: {
    data_type: "string",
    default: "<script></script>"
  },
  html_custom_script: {
    data_type: "string",
    default: "<style></style>"
  },
  html_add_powered_by:{
    data_type:"boolean",
    default:true
  },
  //for html
  //all html_meta_* can use @version,@homepage
  html_meta_keywords:{
    data_type:"string",
    default:""
  },
  html_meta_description:{
    data_type:"string",
    default:"this is the documentation of my project (version:@version)"
  },
  html_meta_author:{
    data_type:"string",
    default:""
  },
  html_meta_og_site_name:{
    data_type:"string",
    default:""
  },
  html_meta_og_url:{
    data_type:"string",
    default:""
  },
  html_meta_og_image:{
    data_type:"string",
    default:""
  },
  html_meta_custom_html:{
    data_type:"string",
    default:""
  },
  html_format_lang:{
    data_type:"string",
    default:"en"
  },
  html_format_g_navi:{
    data_type:"string",
    default:"div"
  },
  html_format_documentation:{
    data_type:"string",
    default:"div"
  },
  //supposed to be ul or ol
  html_format_g_navi_list:{
    data_type:"string",
    default:"ul"
  },
  html_format_notifications:{
    data_type:"string",
    default:"p"
  },
  html_format_item:{
    data_type:"string",
    default:"dl"
  },
  html_format_item_name:{
    data_type:"string",
    default:"dt"
  },
  html_format_item_desription:{
    data_type:"string",
    default:"dd"
  },
  html_format_item_details:{
    data_type:"string",
    default:"div"
  },
  html_format_item_dtails_item:{
    data_type:"string",
    default:"dd"
  },
  html_format_item_details_datatypes:{
    data_type:"string",
    default:"div"
  },
  html_format_item_details_datatype:{
    data_type:"string",
    default:"dd"
  },
  html_format_example_wrap:{
    data_type:"string",
    default:"div"
  },
  html_format_example:{
    data_type:"string",
    default:"code"
  },
  html_format_example_caption:{
    data_types:"string",
    default:"dd"
  },
  html_format_link:{
    data_types:"string",
    default:"a"
  }
};
