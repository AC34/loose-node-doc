module.exports = {
  //must end with .json
  "out_path":{
    type:"must",
    data_type:"string",
  },
  //bool
  "ignore_default_ignore_objects":{
    type:"alternative",
    data_type:"boolean"
  }

};