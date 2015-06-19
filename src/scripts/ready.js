'use strict';

function Emitter() {
  this.handlers = {};
}

Emitter.prototype.add = function(eventName, eventHandler) {
  this.handlers[eventName] = this.handlers[eventName] || [];
  this.handlers[eventName].push(eventHandler);

  return this;
};
