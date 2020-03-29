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

### 3.API
.generate(app_object,options) : 
  - This method is the only method provided by loose-node-doc.

  Arguments:
  1. target app object (required).    
  2. options (optional)

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
You can set various options, see [options page](./OPTIONS.md) for more information.

### 4 About
#### 4.1 Enviroment
Developed on :
  - Node.js (v12.13.0)
  - Windows 10 (not really checking anything on any other OSes)

#### 4.2 Roadmap
Everything should be ok by version 1.0.0.

If this project doesn't get updated, then that's a good news.

Future updates might be of:
  1. Internationalization(translation)
  2. Bug fixes
  3. Presentation (homepage,typofix...)
  4. adopting to ES6
