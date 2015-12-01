# Knot.js

[![Knot.js on NPM](https://img.shields.io/npm/v/knot.js.svg)](https://www.npmjs.com/package/knot.js)

A browser-based emitter, for tying together event handlers.

## Usage

Knot was developed with a modern JavaScript workflow in mind. To use it, it's recommended you have a build system in place that can transpile ES6, and bundle modules. For a minimal boilerplate that fulfills those requirements, check out [outset](https://github.com/callmecavs/outset).

Follow these steps to get started:

* [Install](#install)
* [Call](#call)

### Install

Using NPM, install Knot.js, and add it to your package.json dependencies.

```
$ npm install knot.js --save
```

### Call

Simply import Knot, then call it.

* Passed _no parameters_, Knot will return a new emitter
* Passed _an object_, Knot will extend it to include the emitter methods

```es6
// import Knot
import knot from 'knot.js'

// create a new emitter
const emitter = knot()

// extend an existing object, transforming it into an emitter
const object = new Class()
const modified = knot(object)
```

## License

MIT. © 2015 Michael Cavalea

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
