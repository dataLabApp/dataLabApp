module.exports = {
  context: __dirname,
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './assets/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        test: /scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  }
};
