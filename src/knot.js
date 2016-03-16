export default (object = {}) => {
  let decorated
  let result

  if (checkIsFunction(object)) {
    // Inherit to add events, an own property
    class Knotted extends object {
      constructor() {
        super()
        this.events = {}
      }
    }
    decorated = Knotted.prototype
    // Result should be the constructor but not prototype
    result = Knotted
  } else {
    decorated = object
    decorated.events = {}
    result = object
  }

  decorated.on = function(name, handler) {
    this.events[name] = this.events[name] || []
    this.events[name].push(handler)

    return this
  }

  decorated.once = function(name, handler) {
    handler._once = true
    this.on(name, handler)

    return this
  }

  decorated.off = function(name, handler) {
    arguments.length === 2
      ? this.events[name].splice(this.events[name].indexOf(handler), 1)
      : delete this.events[name]

    return this
  }

  decorated.emit = function(name, ...args) {
    // cache event state, to avoid consequences of mutation from splice while firing handlers
    const cached = this.events[name] && this.events[name].slice()

    // if they exist, fire handlers
    cached && cached.forEach(handler => {
      // remove handler if added with `once`
      handler._once && this.off(name, handler)

      // set `this` context in handler to object, pass in parameters
      handler.apply(this, args)
    })

    return this
  }

  return result
}

function checkIsFunction(toCheck) {
  return toCheck && typeof toCheck === 'function'
}
