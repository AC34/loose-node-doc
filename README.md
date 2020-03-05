# loose-node-doc
Quick n easy Node.js app document generator.

## 💬Anouncement
Everything is under preparation.

Don't use yet.

## How to use
### 1. Installation
Install it as devDependencies.
Type following at your project root.

`npm install loose-node-doc --save-dev`

### 2.Writing genrator script
Create your generator script.
In the script:
  1. require loose-node-doc.
  2. require your app.
  3. set options for loose-node-doc.
  4. then call generate method. 
  5. done

#### API
.generate(app_object,options) : 
  - This method is the only method provided by loose-node-doc.

  Arguments:
  1. target app object (required).    
  2. options (object)

#### Very simple blue print
Your generator script might look like this.

```
//require loose-node-doc before your app.
var lnd = require("loose-node-doc");
var my_app = require("my_app/entry_point");

var options = {
  //using autocompletion
  lnd.options.lang.key:lnd.langs.en.US,

  //you can also type manually
  "some-other-settngs-key":"custom-value"
}

lnd.generate(my_app,options);
//done by this line
```
#### Generating
Run your genrator script.

`node gen-script.js`

done.

### 3.Setting options
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

##### 3.3 Ignoring objects
loose-node-doc tries to find all the necessary paths from the given instance and require cache list. This approach simply might include many unnecessary paths.

Ignoring objects can be done in two ways,
by listing "ignore_paths" and "ignore_objects".
1. Ignoring paths
  - paths are understood as it is from your project root folder(not the OS root).
  - "node_modules" is already ignored by default.
  - You can start the path by blank,"./" or "/".
  - If path is a file, then a file is excluded from the result.
  - If path is a directory, then paths under the directory is excluded from the result.
2. Ignoring by names

 - Names here means object names.

 - Nests are represented by dot.

 - Excludes root object name.

For example, object below 

```
exported_root:{
  name1:{
    name1-1:func1-1(){},
    name1-2:func1-2(){}"
  },
  name2:{}
}
```
is listed as 
```
name1.name1-1
name1.name1-2
name2
```
If you want to exclude func1-1 from output,

` ignore_name:["name1.name1-1"]`

  will do so.

##### 3.4 Choosing language
You may choose language for terminal outputs and logs.
try choosing by 

`[loose-node-doc].lang`

 and autocompletion might help you.

##### 3.4 Format of options.
Create the option as an object.

e.g.
`var options = {option_key:"value",...}`

### 4. Outputs and Customization

#### Default

#### Customizing outputs
You can however customize the outputs in two ways.

##### By fetching html 

##### By the parsed object

### 5 About
#### 5.1 Intention 
This generator is aimed at parsing single object Node.js app that exports some methods traceable from the root object. 

Doesn't work on browser-side js.

Tracing ES5 requires.

If your code has a tree structure that exports methods as branches, then this generator might be able to help you generate documents for your codes.

However, this generator only salvages comments of type "function", and ignores everything else.

#### 5.2 Enviroment
Developed on :
  - Node.js (v12.13.0)
  - Windows 10 (not really checking anything on any other OSes)

#### 5.3 Origin 
I've tried to use some document generators out there and couldn't have an expected output. 

I thought I did something wrong with system structure(single global object). But when I started simply dumping all required caches to console, I was seeing my app was fully loaded. 

Therefore I started making this app,by traversing the loaded caches of require calls.

This project was born.

## Roadmap
Everything should be ok by version 1.0.0.

If this project doesn't get updated, then that's a good news.

Anything else  might be of:
  1. Internationalization(translation)
  2. Bug fixes
  3. Presentation (homepage,typofix...)
