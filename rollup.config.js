import babel from 'rollup-plugin-babel'

const info = require('./package.json')

const config = {
  entry: 'src/knot.js',
  plugins: [ babel() ],
  targets: [
    {
      dest: info.main,
      format: 'umd',
      moduleName: 'Knot'
    }, {
      dest: info.module,
      format: 'es'
    }
  ]
}

export default config
