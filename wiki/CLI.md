	chainy install-plugin <name>

		Installs the plugin titled <name>, alias for:
		npm install --save chainy-plugin-<name>

	
	chainy install-bundle <name>

		Installs the bundle title <name>, alias for:
		npm install --save chainy-bundle-<name>

	
	chainy install <name>

		Attempts to install <name> as a plugin, if that fails, try as a bundle


	chainy browserify [optional arguments...]

		Calls the browserify executable, forwarding the arguments you've sent us,
		as well as requiring all the plugins you have installed


	chainy create-plugin
		
		Scaffolds a new plugin structure within the current working directory


	chainy create-bundle
		
		Scaffolds a new bundle structure within the current working directory