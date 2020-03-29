# Setting Options


#### 3.1 Autocompletion can help
This is one of the reasons loose-node-doc is not using package.json for settings.

You can avoid typing key names listed below by your editor(only if your editor supports).

e.g.
  * `<loose-node-doc>.option_keys.keyname`

#### 3.2 Options
Default settings are enabled when no options are set. 

This is just a mattar of choice. 

You can simply give an empty object"{}" if you want all default settings enabled.

General:
|key|type|default|description|
|:---:|:---:|:---:|:---|
|lang|string|"en_US"|language for logs. See 3.4|
|verbose|boolean|true|Whether to show logs to terminal during the process.|

Storing middle output:
|key|type|default|description|
|:---:|:---:|:---:|:---|
|write_object_tree|boolean|false|Whether to write parsed object information or not.|
|object_tree_path|string|out/loose_doc_tree.json|Path for writing parsed object,from project root. Used when [write_object_tree] is true.|

Storing logs:
|key|type|default|description|
|:---:|:---:|:---:|:---|
|write_logs|boolean|false|Whether to write log or not. [log_path] is used for path.|
|log_path|string|out/loose_doc_log.txt|Path for writing parsed object,from project root. Used when [write_logs] is true.|

Excluding some objects by paths and names:
|key|type|default|description|
|:---:|:---:|:---:|:---|
|enable_default_ignore_paths|boolean|true|Excludes pre defined paths,such as "node_modules" directories.|
|ignore_paths|array|an empty array|Excludes paths by this list. See 3.3 for ignoring.|
|ignore_objects|array|an empty array|Excludes object names.Names must exclude root object name.See 3.3 for ignoring.|

