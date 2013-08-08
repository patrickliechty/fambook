$.extend(typeof FB === "object" ? FB : FB = {}, {

  Promise : {
    all: function all($q, promises) {
      var deferred = $q.defer(),
          counter = promises.length,
          results = [];

      if (counter) {
        promises.forEach(function(promise, index) {
          promise.then(function(value) {
            if (index in results) return;
            results[index] = value;
            if (!(--counter)) deferred.resolve(results);
          }, function(reason) {
            if (index in results) return;
            results[index] = undefined;
            if (!(--counter)) deferred.resolve(results);
          });
        });
      } else {
        deferred.resolve(results);
      }

      return deferred.promise;
    }
  }
});