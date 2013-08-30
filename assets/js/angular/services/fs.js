//(function(angular) {
  "use strict";

//  var module = angular.module('helpers.fs', []);

  fambookApp.factory('FS', function($window) {
    var FS = {};

    FS.File = {
      Image: function(name){
        console.log("RESOLVE IMAGE: " + name);
        if (typeof $window.manifest === "undefined" || typeof $window.manifest.img[name] === "undefined") { console.log("RESOLVED IMAGE: " + '/img/' + name); return '/img/' + name; }
        console.log("RESOLVED IMAGE: " + $window.manifest.img[name]);
        return $window.manifest.img[name];
      }
    };

    return FS;
  });

//})(window.angular);