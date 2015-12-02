import spread from './spread'

export default (object = {}) => {
  object.events = {}

  object.on = (name, handler) => {
    object.events[name] = object.events[name] || []
    object.events[name].push(handler)
    return object
  }

  object.once = (name, handler) => {
    handler._once = true
    object.on(name, handler)
    return object
  }

  object.off = function(name, handler) {
    arguments.length === 2
      ? object.events[name].splice(object.events[name].indexOf(handler), 1)
      : delete object.events[name]

    return object
  }

  object.emit = function(name) {
    // convert additional arguments to array
    const params = spread(arguments)

    // cache event state, to avoid consequences of mutation from splice while firing handlers
    const cached = object.events[name].slice()

    // fire handlers
    cached.forEach(handler => {
      // remove handler if added with `once`
      handler._once && object.off(name, handler)

      // set `this` context in handler to object, pass in parameters
      handler.apply(object, params)
    })

    return object
  }

  return object
}
