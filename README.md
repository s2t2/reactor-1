# Learning React.js

Install React.

````  sh
npm install react --save
npm install react-dom --save
````

Install Webpack development server.

```` sh
npm install webpack --save-dev
npm install webpack-dev-server --save-dev
````

Install CSS loaders for use by Webpack.

```` sh
npm install style-loader --save-dev
npm install css-loader --save-dev
````

Install Babel for JSX transpilation.

```` sh
npm install babel-loader --save-dev
npm install babel-core --save-dev
npm install babel-preset-react --save-dev
npm install babel-preset-es2015 --save-dev
````

Configure Webpack development server using a file called `webpack.config.js` or a custom file name.

Configure `package.json` to specify a script which will run the webpack dev server.

Start the server.

```` sh
#webpack-dev-server --config config/webpack.config.js --content-base app/views/ --progress --colors --inline --hot
#webpack-dev-server --config config/webpack.config.js --hot
npm start
````

> NOTE: To GET and POST comments using the react-tutorial-provided express server,
  run also `node server.js` and view data on localhost:3000.

Visit http://localhost:8080/ in a browser.
