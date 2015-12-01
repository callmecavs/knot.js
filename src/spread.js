export default (args) => {
  // if additional arguments exist, convert them to an array
  if(args.length > 1) {
    let params = []

    for(var i = 1; i < args.length; i++) {
      params.push(args[i])
    }

    return params
  }

  // otherwise, return undefined
  return undefined
}
