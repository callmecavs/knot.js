# Knot.js

[![Knot.js on NPM](https://img.shields.io/npm/v/knot.js.svg)](https://www.npmjs.com/package/knot.js)

A browser-based event emitter, for tying things together.

## Usage

Knot was developed with a modern JavaScript workflow in mind. To use it, it's recommended you have a build system in place that can transpile ES6, and bundle modules. For a minimal boilerplate that does so, check out [outset](https://github.com/callmecavs/outset).

Follow these steps to get started:

* [Install](#install)
* [Call](#call)

Then dig into the [API](#api).

### Install

Using NPM, install Knot.js, and add it to your package.json dependencies.

```
$ npm install knot.js --save
```

### Call

Simply import Knot, then call it.

* Passed _no parameters_, Knot will return a new emitter
* Passed _an object_, Knot will extend it to include the emitter methods

Note that the `this` context in the event handlers:

* Is the object passed in, if one was provided
* Otherwise, it is the emitter itself

```es6
// import Knot

import knot from 'knot.js'

// create a new emitter
// in the handlers, 'this' refers to the emitter

const emitter = knot()

// extend an existing object, transforming it into an emitter
// in the handlers, 'this' refers to the Class

const object = new Class()
const extended = knot(object)
```

## API

All methods are chainable.

Knot exposes the following API:

* [`on`](#onname-handler)
* [`once`](#oncename-handler)
* [`off`](#offname-handler)
* [`emit`](#emitname-arguments)

### .on(name, handler)

Add a handler to a new or existing event.

```es6
// add an anonymous function as a handler

emitter.on('name', () => {
  // ...
})

// add a named function as a handler

const handler = () => {
  // ...
}

emitter.on('name', handler)
```

### .once(name, handler)

Add a handler, that fires _only once_, to a new or existing event.

```es6
// add an anonymous function as a handler

emitter.once('name', () => {
  // ...
})

// add a named function as a handler

const handler = () => {
  // ...
}

emitter.once('name', handler)
```

### .off(name[, handler])

Remove a specific handler from an event.

```es6
// handler must be a named function

const handler = () => {
  // ...
}

emitter.off('name', handler)
```

Remove all of an event's handlers.

```es6
emitter.off('name')
```

### .emit(name[, arguments])

Emit an event, firing all of its handlers.

```es6
emitter.emit('name')
```

Optionally, include arguments that will be passed to each handler.

```es6
// accept arguments in handler

emitter.on('name', (a, b, c, d) => console.log(a, b, c, d))

// include arguments in call to emit

emitter.emit('name', 1, '2', [3], {})

// LOG: 1 '2' [3] {}
```

## Browser Support

Tested in all modern browsers and **IE10+**.

## License

MIT. © 2016 Michael Cavalea

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
