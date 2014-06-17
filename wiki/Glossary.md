- An `extension` is an addition the chain instance of chain class, it can be of three types:
  - `action` added to the chain's queue
  - `utility` added to the chain's `this`
  - `custom` does whatever it wants to the chain

- A `package` is an npm package
  - They can be published to the npm registry

- A `plugin` is an `extension` that was turned into a `package`
  - They can installed and required

- A `bundle` is a package containing a collection of `plugins`
  - They can be installed _but not required_