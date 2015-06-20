'use strict';

function Emitter() {
  this.handlers = {};
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
