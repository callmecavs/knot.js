export default (args) => {
  if(args.length > 1) {
    let params = []

    for(var i = 1; i < args.length; i++) {
      params.push(args[i])
    }

    return params
  }
}
