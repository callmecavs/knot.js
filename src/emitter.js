'use strict';

function Emitter() {
  this.handlers = {};
}

Emitter.prototype.has = function(eventName) {
  return this.handlers.hasOwnProperty(eventName);
}

Emitter.prototype.add = function(eventName, eventHandler) {
  this.handlers[eventName] = this.handlers[eventName] || [];
  this.handlers[eventName].push(eventHandler);

  return this;
};

Emitter.prototype.remove = function(eventName, eventHandler) {
  var index = this.handlers[eventName].indexOf(eventHandler);
  this.handlers[eventName].splice(index, 1);

  return this;
};

Emitter.prototype.removeAll = function(eventName) {
  delete this.handlers[eventName];

  return this;
};

Emitter.prototype.emit = function(eventName) {
  // create arguments array, [].slice prevents optimization
  if(arguments.length > 1) {
    var parameters = [];

    for(var i = 1; i < arguments.length; i++) {
      parameters.push(arguments[i]);
    }
  }

  this.handlers[eventName].forEach(function(eventHandler) {
    eventHandler.apply(this, parameters);
  }.bind(this));

  return this;
};
