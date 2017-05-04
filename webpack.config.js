module.exports = {
  context: __dirname,
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './assets/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
