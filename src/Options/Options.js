module.exports = {
  //must end with .json
  "out_path":{
    data_type:"string",
    default:"loose_doc_tree.json"
  },
  "log_path":{
    data_type:"string",
    default:"loose_doc_log.json"
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
    default:["/node_modules/","/ignore_me/"]
  },
  "ignore_paths":{
    data_type:"array",
    default:[]
  },
  "ignore_objects":{
    data_type:"array",
    default:[]
  }
};