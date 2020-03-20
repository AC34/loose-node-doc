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
  },
  "user_comments":{
    data_type:"object",
    default:""
  }
};