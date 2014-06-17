## Preparation

Create your project if you haven't already done so:

``` bash
mkdir my-chainy-project
cd my-chainy-project
```

Initialize your project with a `package.json` file if you haven't already done so:

``` bash
npm init
```


## Installation

Install the Chainy CLI:

``` bash
npm install -g chainy-cli
```

Use the Chainy CLI to install chainy and some of the common plugins into our project:

``` bash
chainy install common
```

> Bonus: If you're using node version 0.11 and above, using `require('chainy').create().require(...)` will install any missing plugins automatically for you.


## Usage

The following uses the built-in actions `set`, `action` and `done`, as well as the plugin action `map`, to convert each item in the specified array to uppercase then join them together with an exclamation mark at the end:

``` javascript
require('chainy').create().require('map')
    .set(['some', 'data'])
    .map(function(itemValue){
        return itemValue.toUpperCase()
    })
    .action(function(currentChainValue){
        return currentChainValue.join(' ')
    })
    .done(function(err, resultChainValue){
        if (err)  throw err
        console.log('result:', resultChainValue)  // result: SOME DATA!
    })
```

You can also use `map` and `action` asynchronously:

``` javascript
require('chainy').create().require('map')
    .set(['some', 'data'])
    .map(function(itemValue, next){
        return next(null, itemValue.toUpperCase())
    })
    .action(function(currentChainValue, next){
        return next(null, currentChainValue.join(' ')+'!')
    })
    .done(function(err, resultChainValue){
        if (err)  throw err
        console.log('result:', resultChainValue)  // result: SOME DATA!
    })
```



## Use Chainy on the Client-Side

You can create a browserify bundle of chainy including all the installed plugins, using the `browserify` command of the Chainy CLI like so:

``` bash
chainy browserify -o browser.js
```


## Power Users

If you'd prefer to specify exactly which plugins to install (instead of using any bundles), you can do that too (note this should just be part of the normal guide, as this will be intuitively know if we get them install a non-bundled plugin):

``` bash
chainy install-plugin map
```

If you'd prefer to use npm directly to install plugins and bundles (instead of using the Chainy CLI), you can do that too:

``` bash
npm install --save chainy-bundle-common
npm install --save chainy-plugin-map
```

If you'd prefer to specify exactly which installed plugins should be loaded (instead of automatically loading and installing plugins), you can do that too by requiring `chainy-core` instead of `chainy`:

``` javascript
require('chainy-core').subclass().require('map').create()
```

If you'd prefer to specify exactly which installed plugins should be bundled with browserify (instead of automatically bundling all the installed plugins), you can do that too by using browserify directly and manually specifying the plugins to require:

``` bash
npm install -g browserify
browserify -r chainy-plugin-map -o browser.js
```

If you'd prefer to define the naming of your included plugins yourself, rather than having them tied directly to the plugin's name, you can do that too:

``` javascript
require('chainy').create()
    .addExtension('mapwithcustomname', require('chainy-plugin-map'))
    // ...
    .mapwithcustomname(...)
    // ...
```

This custom name ability is useful for when you want to use your super awesome plugin with the same name as another very commonly named plugin:

``` javascript
require('chainy').create()
    .addExtension('map', require('chainy-plugin-myawesomemap'))
    // ...
    .map(...)
    // ...
```