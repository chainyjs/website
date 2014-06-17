This page needs for work for Chainy v1.0 release

## Writing Extensions

There are three extension types in Chainy:

- `action`  which is an extension added to the chain's task runner queue
- `utility` which is an extension added directly to the chain's object
- `custom`  which is an extension that adds itself

The default extension type is `action`, however you should always specify the extension type for clarity and consistency.


### Action Extensions

Action extensions are for when you want to perform an action on the data or with it. They are run serially (one after the other, in sequence), ensuring that the previous action has completed, before the next action begins.

The following defines an action extension that sets the chain's data with the passed argument:

``` javascript
require('chainy').create()
	.addExtension('mylog', 'action', function(currentValue){
		console.log(currentValue)
	})
	.addExtension('myset', 'action', function(currentValue, newValue){
		return newValue
	})
	.mylog()  // null
	.myset('some data')
	.mylog()  // some data
```

Actions accept the chain's current data as the first argument they receive.

Actions can accept an optional completion callback argument as the last argument. It doesn't have to be named in any special way, the only condition is that it isn't provided by the user when they call your action, as it is something we inject ourselves.

Actions can apply replace the chain's data with something else, by either returning the new data, or by giving the completion callback the new data.

Completion callbacks have the signature `(err, newData)`. If `err` is defined, then the action is considered failed, and the chain will exit immediately, not running any remaining actions. If `newData` is defined, it will replace the chain's data.

The following defines an action extension that uses a completion callback to set the chain's data after 10 seconds:

``` javascript
require('chainy').create()
	.addExtension('mylog', 'action', function(currentValue){
		console.log(currentValue)
	})
	.addExtension('myset', 'action', function(currentValue, newValue, next){
		setTimeout(function(){
			return next(null, newValue)
		}, 1000*10)
	})
	.mylog()  // null
	.myset('some data')
	.mylog()  // some data
```

Actions can accept as many or as little user arguments as they want, however a completion callback must be used if any of the arguments are optional.

In the above example, `mylog` accepts no user arguments, only the single `currentValue` argument that Chainy automatically provides to all actions. Whereas `myset` accepts the user argument `newValue` which is set to `'some data'` in our example.



### Utility Extensions

Utility extensions are for when you want to interact with the chainy instance rather than with its data. It's useful for extensions like progress bars and debug helpers that listen to the progress of the actions and output data as they complete.

See the `progress` plugin for an example of a utility extension that listens to ...


### Custom Extensions

These are not yet documented.



## Tips for writing extensions

1. Keep the API as concise as possible, if you can utilise other extensions, then do it
1. Plugin names can only contain lowercase letters, as anything else would be confusing to the user about which naming format to use, hot to use it, and it could possibly cause plugin naming conflicts


## How Extensions Work

This section may no longer be needed, as the above is newer and may cover the content here.


Plugins are injected into the Chainy prototype using the `Chainy.addPlugin(name, method)` method:

- `name` is a string for the key that the plugin is inserted at, e.g. `Chainy.addPlugin('hello', function(){return 'world';})` has the plugin injected at `Chainy.prototype.hello`, making it availably via `chainyInstance.hello()`

- `method` is a synchronous or asynchronous method that you defined that will perform the action of your plugin


You can also use `Chainy.require(arrayOfPlugins)` to require bundled plugins with chainy, or to commonjs require an external plugin with the prefix`chainy-`. For example, running `Chainy.require(['set', 'hello'])` will require the bundled add plugin and the external plugin with the package name `chainy-hello`.


To avoid polluting the global Chainy prototype with your plugins, it is recommended that you use `Chainy.extend()` to create a local subclass of chainy that you can inject plugins into safely without polluting the global Chainy prototype:

``` javascript
var Chainy = require('chainy').extend().require(['set', 'log', 'done']);
```


Things to know about creating plugins:

1. The context (what `this` means) of the plugin method is set to the chain that the plugin is executing on:

	``` javascript
	// when doing the following
	chainyInstance.hello()
	// the context of hello's plugin method when executed will be that of `chainyInstance`
	```

2. The context is important, as your plugin will use it to apply the changes of the data back to the chain:

	``` javascript
	Chainy.addPlugin('x5', function(){
		this.data = this.data.map(function(value){
			return value*5;
		});
	});
	Chainy.create().set([1,2,3]).x5().log() // [5, 10, 15]
	```

3. You can accept arguments in your plugin:

	``` javascript
	Chainy.addPlugin('x', function(n){
		this.data = this.data.map(function(value){
			return value*n;
		});
	});
	Chainy.create().set([1,2,3]).x(10).log() // [10, 20, 30]
	```

4. You can make your plugin asynchronous by accepting an unspecified-by-the-user completion callback as the last argument:

	``` javascript
	Chainy.addPlugin('download', function(url, next){
		var chainyInstance = this;
		require('request')(url, function(err, response, body){
			if ( err )  return next(err);
			chainyInstance.data = body;
			return next();
		});
	});
	Chainy.create().download('http://some.url').log() // outputs whatever http://some.url pointed to
	// notice how the user only provides the `url` argument, chainy provides the `next` argument
	```

5. Plugin methods aren't fired directly, instead they are fired as tasks in the taskgroup runner of the chain. This allows tasks to be executed serially (one after the other) as well as safe error handling if a task fails (the chain stop executing more tasks and will exit). You can safely handle errors like so:

	``` javascript
	Chainy.addPlugin('oops', function(){
		throw new Error('something went wrong!');
	});
	Chainy.create().oops().done(function(err, chainData}){
		if ( err )  console.log('error:', err.stack or err);
		console.log('data:', chainData);
	});
	```