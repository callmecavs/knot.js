# emitter

A simple event emitter for the browser, to keep your UI code DRY.

## Usage

Review [the source](https://github.com/callmecavs/emitter/blob/master/src/emitter.js) for more complete documentation.

```javascript
// create an instance
var emitter = new Emitter();

// add event and handler
emitter.add('eventName', eventHandler);

// remove specific handler
emitter.remove('eventName', eventHandler);

// remove all handlers
emitter.removeAll('eventName');

// fire event
emitter.emit('eventName', ...arguments);

// check for handlers
var eventBoolean = emitter.has('eventName');

// get handlers
var eventHandlers = emitter.get('eventName');

// chain (most of) the methods
emitter.add('eventName', eventHandler)
       .remove('eventName', eventHandler)
       .removeAll('eventName')
       .emit('eventName', ...arguments);
```

## Roadmap

- [ ] Add events that only fire once
- [ ] Improve README
- [ ] Rename, publish to NPM/Bower

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
