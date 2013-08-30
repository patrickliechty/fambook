/**
 * Module dependencies
 */
var woodruff = require("woodruff")
  , shared = require("shared-ui");

/**
 * Expose the app
 */
var app = module.exports = woodruff(__dirname, shared);


//app.configure('development', function() {
  var proxy = require("simple-http-proxy"),
      env = require('envs'),
      treeBaseUrl = env("TREE_BASE_URL", "https://familysearch.org");

  function acceptproxy(url, mime) {
    var p = proxy(url);
    return function (req, res, next) {
      if ((req.headers['accept'] && req.headers['accept'].indexOf(mime) === 0)
          || req.headers['content-type'] === 'application/json') {
        return p(req, res, next);
      }
      return next();
    };
  }

  app.stack.splice(0, 0, {
    route: "/tree-data",
    handle: proxy("https://familysearch.org/tree-data")
  });

  app.stack.splice(0, 0, {
    route: "/watch",
    handle: proxy("https://familysearch.org/watch")
  });

  app.stack.splice(0, 0, {
    route: "/scopeservice",
    handle: proxy("https://familysearch.org/scopeservice")
  });

  app.stack.splice(0, 0, {
    route: "/alertservice",
    handle: proxy("https://familysearch.org/alertservice")
  });

  app.stack.splice(0, 0, {
    route: "/cas-public-api",
    handle: proxy("https://familysearch.org/cas-public-api")
  });

  app.stack.splice(0, 0, {
    route: "/cis-public-api",
    handle: proxy("https://familysearch.org/cis-public-api")
  });

  //});

//var io = require('socket.io').listen(app);
//
//io.sockets.on('connection', function (socket) {
//  socket.emit('news', { hello: 'world' });
//  socket.on('my other event', function (data) {
//    console.log(data);
//  });
//
//  socket.on('disconnect', function () {
//    console.log("user disconnected");
//  });
//});

