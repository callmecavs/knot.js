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

  object.emit = (name) => {
    const params = spread(arguments)

    // TODO: should `null` be `object`?
    object.events[name].forEach(callback => callback.apply(null, params))

    // TODO: accept array of events
    // Array.isArray(names)
    //   ? names.forEach(name => object.events[name].forEach(callback => callback.apply(null, params)))
    //   : object.events[name].forEach(callback => callback.apply(null, params))

    return object
  }

  return object
}
