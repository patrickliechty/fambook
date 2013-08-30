"use strict";

fambookApp.factory('FS', ['$window', function($window) {
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
}]);
