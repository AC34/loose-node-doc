# Setting Options

[back to README.md](./README.md)

#### 1 Autocompletion
This is one of the reasons loose-node-doc is not using package.json for settings.

You can avoid typing key names listed below by your editor(only if your editor supports).

option keys
  * `<loose-node-doc>.option_keys.<keyname>`

html tempaltes
  * `<loose-node-doc>.<template-name>`

langauges for terminal and logs
  * `<loose-node-doc>.langs.<language>.<country>`

##### 1.1 Avaialble languages
Currently available languagse are as follows:


 - en<span></span>.US

#### 2 Options list
Default settings are enabled when no options are set. 

You can simply give an empty object"{}" if you want all default settings enabled.

General:

|key|type|default|description|
|:---:|:---:|:---:|:---|
|lang|string|"en_US"|language for logs. See 3.2|
|verbose|boolean|true|Whether to show logs to terminal during the process.|
|package_json_path|string|"package.json"|path of package.json file from project root directory.|

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

Basic html page variables.

|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_path|string|"out/@version/index.html"|path from proejct root. pattern "@version" will be replaced by version string declared in package.json|
|html_template_name|string|"4-6-blue"|template name.|

Texts for embedding.

|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_site_title|string|"my project documentation"|This is the page title. used for title,h1 elements.|
|html_site_description|string|"my project's documentation page."|description tag element text.|
|html_notifications|array|["this is notification 1"]|a list of notifications to embed at the top of the page.|

Htmls for embedding.

|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_about_html|"string"|"&lt;p&gt;This is my documentation.&lt;/p&gt;"|Introduction html of the page.|
|html_version_html|"string"|"&lt;p&gt;version:@version&lt;/p&gt;"|Version information of package.json. First occurance of pattern "@version" is replaced by version string.|
|html_custom_css|string|"&lt;style&gt;&lt;/style&gt;"|Custom style element and text.|
|html_custom_css|string|"&lt;script&gt;&lt;/script&gt;"|Custom script element and code.|

Embedding global navi links.

|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_gnavi_links|object|{"self":"./"}|Pairs of (link name:link)|

html meta informations.
(all variables can use @version,@homepage for package.json values(version,homepage).
empty values will be ignored.)

|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_meta.keywords|string|""|Keywords for meta element "keywords".|
|html_meta.description|string|"this is the documentation of my project (version:@version)"|This is different from description element itself.|
|html_meta.author|string|""|The author name|
|html_meta.og_site_name|string|""|Text for meta element "og:site_name".|
|html_meta.og_url|string|""|Text for "og:site_url".|
|html_meta.og_image|string|""|Image url for meta element "og:image_url"|
|html_meta.custom_html|string|""|Additional html for meta elements.|

Html elements for page

|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_format.lang|string|"en"|See https://www.w3schools.com/tags/att_global_lang.asp for details.|
|html_format.g_navi|string|"div"|Element name for global navigation|
|html_format.documentation|string|"div"|Element name for #documentation|
|html_format.g_navi_list|string|"ul"|Element name for list type. This is supposed to be ul or ol.|
|html_format.notifications|string|"p"|Element name for notifications texts. notifications text are set by html_notifications|

Html elements for documentation items.

|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_format.item|string|"dl"|Element name for the wrapper element of documentation item|
|html_format.item_description|string|"dd"|Descriptio here mening texts in comments.|
|html_format.item_details|string|"div"|Name for wrapper element of a comment line starting with @|
|html_format.item_details_item|string|"dd"|Generic element name for each comment tag(with heading @)|
|html_format.item_details_datatypes|string|"div"|Wrapper elemenet name of datatype definitions.(between { and })|
|html_format.item_details_datatype|string|"dd"|Element name of datatype declaration.|
|html_format.example_wrap|string|"div"|Wrapper element name of @example tag.|
|html_format.example|string|"code"|Element name for @example tag.|
|html_format.example_caption|string|"dd"|Replacement element name of &lt;captoin&gt; tag of @example block|
|html_format.link|string|"a"|Element name for @link tag text.|

#### 3 Step by step
##### 3.1 Format of options.
Create the option as an object.

e.g.

```
var options = {option_key:"value",...}
```

##### 3.2 Choosing language for terminal and logs.
You may choose language for terminal outputs and logs.
try choosing by 
```
[loose-node-doc].lang
```

#### 3.3 Customizing output html
There are 2 ways to customize  output html.
##### 3.3.1 By template and setting html options
This is the easiest path to have your documentation page.
Default settings will put default values. You might want to at least change the follwing settings to suit your project:
  1. html_site_title
  2. html_site_description
  3. html_notifications (can be blank array)
  4. html_about_html
  5. html_gnavi_links 
#### 3.3.2 Available templates
Currently avaialble template are below: 


 - 4-6-blue
 - 4-6-green
 - 4-6-mono
 - 4-6-orange
 - 4-6-purple
 - 4-6-red


##### 3.3.3 By bare object tree
Setting "write_object_tree" to true will give you the bare data of your project. See the data and take advantage of your freedom with it.

#### 4. Controlling html content

loose-node-doc tries to find all the necessary paths from the given instance and "require" cache list. This approach simply might include many unnecessary paths.

Ignoring objects can be done by either listing "ignore_paths" and "ignore_objects".

##### 4.1. Ignoring paths
  - paths are understood as it is from your project root folder(not the OS root).
  - loose-node-doc is automatically removed.
  - You can start the path by blank,"./" or "/".
  - If path is a file, then a file is excluded from the result.
  - If path is a directory, then paths under the directory is excluded from the result.

##### 4.2. Ignoring by names

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

##### 4.3. @trail tag
Auto parsing of your project will only try to pick functions in the object. If you want any object to be picked, put @trail tag in your comments.

nameing rule for @trail tag is same as explained above in "Ignoring by names" section.
