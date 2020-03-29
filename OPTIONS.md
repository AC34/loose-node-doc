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
|html_about_html|"string"|"&lt;p&gt;This is my documentation.&lt;/p&gt;"|introduction html of the page.|
|html_version_html|"string"|"&lt;p&gt;version:@version&lt;/p&gt;"|Version information of package.json. First occurance of pattern "@version" is replaced by version string.|
|html_custom_css|string|"&lt;style&gt;&lt;/style&gt;"|Custom style element and text.|
|html_custom_css|string|"&lt;script&gt;&lt;/script&gt;"|Custom script element and code.|

Embedding global navi links.
|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_gnavi_links|object|{"self":"./"}|Pairs of (link name:link)|

html meta informations.
(all variables can use @version,@homepage for package.json values(version,homepage).
empty values will be ignored.
|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_meta.keywords|string|""|keywords for meta element "keywords".|
|html_meta.description|string|"this is description page of my package version:@verseion"|this different from description element itself.|
|html_meta.author|string|""|author name|
|html_meta.og_site_name|string|""|text for meta element "og:site_name".|
|html_meta.og_url|string|""|text for "og:site_url".|
|html_meta.og_image|string|""|image url for meta element "og:iamge_url"|
|html_meta.custom_html|string|""|additional html for meta elements.|

Html elements
|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_format.lang|string|"en"|
|html_format.g_navi|string|"div"|element name for global navigation|
|html_format.documentation|string|"div"|element name for #documentation|
|html_format.g_navi_list|string|"ul"|element name for list type. This is supposed to be ul or ol.|
|html_format.notifications|string|"p"|element name for notifications texts. notifications text are set by html_notifications|

Html elements for documentation items.
|key|type|default|description|
|:---:|:---:|:---:|:---|
|html_format.item|string|"dl"|element name for the wrapper element of documentation item|
|html_format.item_description|string|"dd"|descriptio here mening texts in comments.|
|html_format.item_details|string|"div"| name for wrapper element of a comment line starting with @|
|html_format.item_details_item|string|"dd"|Generic element name for each comment tag(with heading @)|
|html_format.item_details_datatypes|string|"div"|wrapper elemenet name of datatype definitions.(between { and })|
|html_format.item_details_datatype|string|"dd"|element name of datatype declaration.|
|html_format.example_wrap|string|"div"|wrapper element name of @example tag.|
|html_format.example|string|"code"|element name for @example tag.|
|html_format.example_caption|string|"dd"|replacement element name of &lt;captoin&gt; tag of @example block|
|html_format.link|string|"a"|element name for @link tag text.|

