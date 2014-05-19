(function(){
	"use strict";
	var Chainy = require('chainy').extend().require(['set', 'log', 'feed', 'map', 'swap']);
	Chainy.create()

		// Fetch the source readme content for each of our repos
		// initially use github's apis, soon use npm's
		.feed('https://api.github.com/orgs/chainy-plugins/repos')
		.map(function(repo, next){
			Chainy.create()
				.set({
					"package": {
						"url": 'https://raw.githubusercontent.com/'+repo.full_name+'/master/package.json',
						"parse": "json"
					},
					"readme": {
						"url": 'https://raw.githubusercontent.com/'+repo.full_name+'/master/README.md',
						parse: false
					}
				})
				.map(function(feed, next){
					Chainy.create().feed(feed).done(next)
				})
				.done(next)
		})

		// Extract the content within the <!-- CHAINY -->blah<!-- /CHAINY --> block
		.map(function(plugin){
			var temp;

			if ( !plugin.readme || !plugin['package'] )  return null

			if ( plugin['package'].chainyPluginDocumentation ) {
				plugin.readme = plugin['package'].chainyPluginDocumentation
				return plugin
			}

			plugin.readme = plugin.readme.toString()
			if ( 'Not Found' === plugin.readme )  return null

			temp = plugin.readme.replace(/^[\s\S]+?\n<\!-- CHAINY_DOCUMENTATION\/ -->\n+/, '')
			if ( temp === plugin.readme )  return null
			plugin.readme = temp

			temp = plugin.readme.replace(/\n+<\!-- \/CHAINY_DOCUMENTATION -->[\s\S]+$/, '')
			if ( temp === plugin.readme )  return null
			plugin.readme = temp

			return plugin
		})

		// Keep only those that still exist
		.swap(function(plugins){
			return plugins.filter(function(plugin){
				return Boolean(plugin)
			})
		})

		.swap(function(plugins){
			return plugins.forEach(function(plugin){
				console.log(plugin['package'].name+':\n'+plugin.readme+'\n\n')
			})
		})

		// Output resul
		.done(function(err){
			if (err)  return console.log(err.stack || err)
			console.log('OK');
		})
})();