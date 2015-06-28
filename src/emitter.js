'use strict';

/**
 * Create a new Emitter.
 *
 * @class
 */
function Emitter() {
  this.handlers = {};
}

/**
 * Check if an event has handlers.
 *
 * @param {String} eventName
 * @return {Boolean}
 */
Emitter.prototype.has = function(eventName) {
  return this.handlers.hasOwnProperty(eventName);
}

/**
 * Get the array of event handlers.
 *
 * @param {String} eventName
 * @return {Function[]}
*/
Emitter.prototype.get = function(eventName) {
  return this.handlers[eventName];
}

/**
 * Add a handler to an event.
 *
 * @param {String} eventName
 * @param {Function} eventHandler
 * @return {Emitter}
 */
Emitter.prototype.add = function(eventName, eventHandler) {
  this.handlers[eventName] = this.handlers[eventName] || [];
  this.handlers[eventName].push(eventHandler);

  return this;
};

/**
 * Remove a handler from an event.
 *
 * @param {String} eventName
 * @param {Function} eventHandler
 * @return {Emitter}
 */
Emitter.prototype.remove = function(eventName, eventHandler) {
  var index = this.handlers[eventName].indexOf(eventHandler);
  this.handlers[eventName].splice(index, 1);

  return this;
};

/**
 * Remove all handlers from an event.
 *
 * @param {String} eventName
 * @return {Emitter}
 */
Emitter.prototype.removeAll = function(eventName) {
  delete this.handlers[eventName];

  return this;
};

/**
 * Emit an event, calling all handlers with the provided arguments.
 *
 * @param {String} eventName
 * @param {Mixed} ...
 * @return {Emitter}
 */
Emitter.prototype.emit = function(eventName) {
  // create arguments array, [].slice prevents optimization
  if(arguments.length > 1) {
    var parameters = [];

    for(var i = 1; i < arguments.length; i++) {
      parameters.push(arguments[i]);
    }
  }

  // call each handler, applying the arguments array
  this.handlers[eventName].forEach(function(eventHandler) {
    // TODO: should `this` be a parameter of the emit function?
    eventHandler.apply(this, parameters);
  }.bind(this));

  return this;
};
