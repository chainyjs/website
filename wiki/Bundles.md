## What are Bundles?

Bundles are a great way to automatically install plugins you use again and again. For instance if you use the plugins `map` and `log` all the time, you can create a bundle for them, that when installed, will install the bundled plugins.

Bundles can be installed with Chainy CLI using `chainy install-bundle mybundle` or with npm using `npm install --save chainy-bundle-mybundle`.

Bundles operate by specifying the plugins they bundle as [peerDependencies](http://blog.nodejs.org/2013/02/07/peer-dependencies/). The peer dependencies of a package are automatically installed along with the package that defines them. They are perfect for chainy bundes.


## Creating Bundles

If you find yourself always installing certain plugins again and again, you can create a bundle for them.

Create a directory for your bundle:

``` bash
mkdir chainy-plugin-mybundle
cd chainy-plugin-mybundle
```

Then use the Chainy CLI to create your bundle:

``` bash
chainy create-bundle
```

Then publish your bundle so that it can be installed by yourself and others:

``` bash
npm publish
```


## Power Users

You can create your bundle manually without the Chainy CLI by simply creating a `package.json` file with the chainy plugins you want to bundle listed the inside peer dependencies of your bundle's `package.json` file, like so:

``` json
{
  "name": "chainy-bundle-mybundle",
  "keywords": [
    "chainy",
    "chainy-addon",
    "chainy-bundle"
  ],
  "peerDependencies": {
    "chainy-plugin-count": "*",
    "chainy-plugin-log": "*",
    "chainy-plugin-map": "*",
    "chainy-plugin-pipe": "*",
    "chainy-plugin-push": "*"
  }
}
```

> Note: If you are intending on using the above, you'll probably want to use `npm init` to create the complete `package.json` file, then just add the `peerDependencies` to it, as the above is missing fields like license, author, etc.
