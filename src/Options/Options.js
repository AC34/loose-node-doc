module.exports = {

  "lang":{
    data_type:"string",
    default:"en_US"
  },
  "write_object_tree":{
    data_type:"boolean",
    default:false
  },
  //from project root dir
  "object_tree_path":{
    data_type:"string",
    default:"out/loose_doc_tree.json"
  },
  "write_logs":{
    data_type:"boolean",
    default:false
  },
  //from project root dir
  "log_path":{
    data_type:"string",
    default:"out/loose_doc_log.txt"
  },
  //without @
  "trail_tag":{
    data_type:"string",
    default:"trail"
  },
  //console
  "verbose":{
    data_type:"boolean",
    default:true
  },
  //bool
  "enable_default_ignore_paths":{
    data_type:"boolean",
    default:true
  },
  //paths fromo user's build script
  "default_ignore_paths":{
    data_type:"array",
    default:["/node_modules/"]
  },
  "ignore_paths":{
    data_type:"array",
    default:[]
  },
  "ignore_objects":{
    data_type:"array",
    default:[]
  },
  //from project root
  "package_json_path":{
    data_type:"string",
    default:"package.json"
  }
};