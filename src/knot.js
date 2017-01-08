const knot = (extended = {}) => {
  const events = Object.create(null)

  function on (name, handler) {
    events[name] = events[name] || []
    events[name].push(handler)
    return this
  }

  function once (name, handler) {
    handler._once = true
    on(name, handler)
    return this
  }

  function off (name, handler = false) {
    handler
      ? events[name].splice(events[name].indexOf(handler), 1)
      : delete events[name]

    return this
  }

  function emit (name, ...args) {
    // cache the events, to avoid consequences of mutation
    const cache = events[name] && events[name].slice()

    // only fire handlers if they exist
    cache && cache.forEach(handler => {
      // remove handlers added with 'once'
      handler._once && off(name, handler)

      // set 'this' context, pass args to handlers
      handler.apply(this, args)
    })

    return this
  }

  return {
    ...extended,

    on,
    once,
    off,
    emit
  }
}

export default knot
