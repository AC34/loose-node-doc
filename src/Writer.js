var FileWriter = require("loose-node-doc/src/out/FileWriter");
function Writer(root_dir,Console) {
  this.writer = new FileWriter(root_dir);
  this.console = Console;
}
Writer.prototype.writeOtree = function(options, otree) {
  //not writing
  if (!options.write_object_tree) return;
  if(options.write_object_tree===false)return;
  var file_path = this.writer.getAbsolutePath(options.object_tree_path);
  //not writable then notify.
  if(!this.writer.isWritablePath(file_path)){
    this.console.outMessage("process-invalid-object-tree-path",{"path":options.object_tree_path});
  }
  //write
  var result = this.writer.writeObject(file_path,otree);
  if(result===true){
    this.console.outMessage("process-write-file-success",{path:file_path});
  }else{
    //error string is returned
    this.console.outMessage("process-error-on-writing-file",{path:file_path,error:result});
  }
};
Writer.prototype.writeLog = function(options, log_array) {
  //not writing
  if (!options.write_logs) return;
  if(options.write_logs===false)return;
  var log_path = this.writer.getAbsolutePath(options.log_path);
  //not writable then notify.
  if(!this.writer.isWritablePath(log_path)){
    this.console.outMessage("process-invalid-log-path",{"path":options.log_path});
  }
  //write
  var result = this.writer.writeText(log_path,log_array);
  if(result===true){
    this.console.outMessage("process-write-file-success",{path:log_path});
  }else{
    //error string is returned
    this.console.outMessage("process-error-on-writing-file",{path:log_path,error:result});
  }
};

module.exports = Writer;
