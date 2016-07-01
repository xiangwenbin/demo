module.exports = {
  entry: './src/javascript/pages/index.js',
  output: {
    path: './js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
}