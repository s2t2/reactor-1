var path = require('path');
var webpack = require('webpack');

var port = process.env.PORT || 8080;

module.exports = {
  entry: './app.js',
  output: {
    filename: './dist/bundle.js'
  },
  devServer: {
    port: port,
    contentBase: "./app/views",
    progress:true,
    colors:true,
    inline:true,
    proxy: {
      "/api/*": {
        target: "http://localhost:3000",
        secure: false,
        //rewrite: function(req, options) {
        //  //you can handle rewrite here if you need to
        //}
      }
    }
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
