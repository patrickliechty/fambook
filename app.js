/**
 * Module dependencies
 */
var woodruff = require("woodruff")
  , shared = require("shared-ui");

/**
 * Expose the app
 */
var app = module.exports = woodruff(__dirname, shared);


app.configure('development', function() {
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
    route: "/scopeservice",
    handle: proxy("https://familysearch.org/scopeservice")
  });
});