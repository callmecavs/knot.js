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

  return object
}
