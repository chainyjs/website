## Roadmap to v1.0

Essentials:

- [x] Get it awesome
- [x] Get it working
- [x] Figure out extension API
- [x] Prevent base prototypes from being extended
- [x] Figure out how plugins and bundles will be created and installed
- [x] Figure out whether to keep the name `extensions` or go back to `plugins` (done, see [[Glossary]])
- [x] Have `Chainy.prototype.create()` keep the parent's extensions
- [x] Rip out plugins from main repo
- [ ] Finished publishing ripped out plugins
- [ ] Create the Chainy CLI
  - [ ] Create plugins for Chainy for interacting with the CLI
  - [x] Figure out whether to publish `chainy-autoload`, or `chainy-core`
    - Most probably `autoload` can be a plugin, that `chainy` uses, with `chainy` using `chainy-core`
  - [x] Figure out if the overhead of having the CLI inside `chainy` is worth it, as the CLI will be installed for every module, when it doesn't have to be. Perhaps best to publish `chainy-cli`, that then exposes `chainy` (it's not, renamed CLI in docs to `chainy-cli`)
- [ ] Finish the documentation

Optionals:

- [ ] Create a website
- [ ] Create a `fork` and `upstream` extension

## Roadmap to v2.0

There will be hopefully be no v2.0. Chainy will be final at v1.0, with innovations now occurring in plugins.