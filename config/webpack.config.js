var path = require('path');
var webpack = require('webpack');

var host;
if (process.env.NODE_ENV == "production") {
  host = "https://reactor-1.herokuapp.com" // todo: get/look-up
} else {
  host = "http://localhost"
}

var port = process.env.PORT || 8080;
var apiPort = process.env.API_PORT || 5000;

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
        // target: "http://localhost:3000",
        target: host+":"+apiPort ,

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
