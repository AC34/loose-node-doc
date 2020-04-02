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
  //for html
  //all values can use @version,@homepage
  html_meta: {
    data_type: "object",
    default: {
      keywords: "",
      description: "this is the documentation of my project (version:@version)",
      author: "",
      og_site_name: "",
      og_url: "",
      og_image: "",
      custom_html: ""
    }
  },
  html_format: {
    data_type: "object",
    default: {
      lang: "en",
      g_navi: "div",
      documentation: "div",
      //expecting ul or ol
      g_navi_list: "ul",
      notifications: "p",
      item: "dl",
      item_name: "dt",
      item_description: "dd",
      item_details: "div",
      item_details_item: "dd",
      item_details_datatypes: "div",
      item_details_datatype: "dd",
      example_wrap: "div",
      example: "code",
      example_caption: "dd",
      link: "a"
    }
  }
};
