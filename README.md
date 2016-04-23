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

Configure Webpack development server using a file called `webpack.config.js`.

Install Babel for JSX transpilation.

```` sh
npm install babel-loader --save-dev
npm install babel-core --save-dev
npm install babel-preset-react --save-dev
npm install babel-preset-es2015 --save-dev
````

Start the server.

```` sh
webpack-dev-server --progress --colors --inline --hot
````

Visit http://localhost:8080/ in a browser.
