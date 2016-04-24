// source: https://github.com/reactjs/react-tutorial/blob/master/server.js
// adaptations: http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy'); // adaptation
var proxy = httpProxy.createProxyServer(); // adaptation
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');
var isProduction = process.env.NODE_ENV === 'production'; // adaptation
var port = isProduction ? process.env.PORT : 3000; // adaptation

app.set('port', port); // adaptation

app.use('/', express.static(path.join(__dirname, 'app/views'))); // customization
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




// adaptation:
// We only want to run the workflow when not in production
if (!isProduction) {
  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./dist/bundle.js');
  bundle();

  // Any requests to localhost:3000/dist is proxied
  // to webpack-dev-server
  app.all('/dist/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});





// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

//app.post('/api/comments', function(req, res) {
//  fs.readFile(COMMENTS_FILE, function(err, data) {
//    if (err) {
//      console.error(err);
//      process.exit(1);
//    }
//    var comments = JSON.parse(data);
//    // NOTE: In a real implementation, we would likely rely on a database or
//    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
//    // treat Date.now() as unique-enough for our purposes.
//    var newComment = {
//      id: Date.now(),
//      author: req.body.author,
//      text: req.body.text,
//    };
//    comments.push(newComment);
//    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
//      if (err) {
//        console.error(err);
//        process.exit(1);
//      }
//      res.json(comments);
//    });
//  });
//});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
