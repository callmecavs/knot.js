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

  object.off = (name) => {
    delete object.events[name]
    return object
  }

  object.emit = function(name) {
    // convert additional arguments to array
    const params = spread(arguments)

    // fire handlers
    object.events[name].forEach(handler => {
      // remove handler if added with `once`
      handler._once && object.events[name].splice(object.events[name].indexOf(handler), 1)

      // set `this` context in handler to object, pass in parameters
      handler.apply(object, params)
    })

    // TODO: accept array of events to fire
    // Array.isArray(name)
    //   ? names.forEach(name => object.events[name].forEach(callback => callback.apply(object, params)))
    //   : object.events[name].forEach(callback => callback.apply(object, params))

    return object
  }

  return object
}
