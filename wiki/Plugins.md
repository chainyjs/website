## Creating Plugins

If you've created an extension that you love, you can share it with others by making it into a plugin.

### Preparation

First create a new directory for your plugin to live in:

``` bash
mkdir chainy-plugin-myplugin
cd chainy-plugin-myplugin
```

### Scaffolding
Use the Chainy CLI to scaffold the structure of your plugin (it will ask you a few questions):

``` bash
chainy create-plugin
```

### Writing your Plugin

Inside `lib/yourPluginName.js` convert your extension from something that looks like this:

``` javascript
// uses the `addExtension` API call to define an action extension called `set`
require('chainy').create().addExtension('set', 'action', function(currentValue, newValue){
    return newValue
})

// or even something that looks like this, which
// uses the `action` API call to execute an unnamed action
require('chainy').create().action(function(currentValue, newValue){
    return newValue
})
```

Into something that looks like this:

``` javascript
module.exports = function(currentValue, newValue){
    return newValue
}
module.exports.extensionType = 'action'
```


### Publishing your Plugin

Then publish your plugin so that it can be installed by yourself and others:

``` bash
npm publish
```

