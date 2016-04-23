var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    //path: __dirname,
    //filename: 'dist/bundle.js'
    //path: __dirname + "/dist",
    //filename: __dirname+'/dist/bundle.js'

    filename: './dist/bundle.js'
    //path: path.join(__dirname, 'dist'),
    //filename: 'bundle.js'
  },
  devServer: {
    contentBase: "./app/views",
    progress:true,
    colors:true,
    inline:true,
    // hot:true // NEED TO PASS THIS AS THE --hot flag. see https://github.com/webpack/webpack/issues/1151
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
};
