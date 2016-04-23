#  React.js

Install React.

````  sh
npm install react --save
npm install react-dom --save
````

Install webpack development server.

```` sh
npm install webpack --save-dev
npm install webpack-dev-server --save-dev
````

Install Babel for JSX transpilation.

```` sh
npm install babel-loader --save-dev
npm install babel-core --save-dev
npm install babel-preset-react --save-dev
npm install babel-preset-es2015 --save-dev
````

Start the server.

```` sh
webpack-dev-server --progress --colors
#webpack main.js bundle.js --module-bind 'js=babel-loader'
````

Visit http://localhost:8080/webpack-dev-server/ in a browser.
