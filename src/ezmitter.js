import spread from './spread'

export default (object = {}) => {
  object.events = {}

  object.on = (name, handler) => {
    object.events[name] = object.events[name] || []
    object.events[name].push(handler)
    return object
  }

  object.off = (name) => {
    delete object.events[name]
    return object
  }

  object.emit = function(name) {
    // convert additional arguments to array
    const params = spread(arguments)

    // set `this` context in callback(s) to object
    object.events[name].forEach(callback => callback.apply(object, params))

    // TODO: accept array of events to fire
    // Array.isArray(name)
    //   ? names.forEach(name => object.events[name].forEach(callback => callback.apply(object, params)))
    //   : object.events[name].forEach(callback => callback.apply(object, params))

    return object
  }

  return object
}
