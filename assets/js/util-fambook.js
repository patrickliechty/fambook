$.extend(typeof FB === "object" ? FB : FB = {}, {

  Promise : {
    all: function all($q, promises) {
      var deferred = $q.defer(),
          counter = promises.length,
          results = [];

      if (counter) {
        promises.forEach(function(promise, index) {
          //console.log("Add promise: ", promise);
          promise.then(function(value) {
            //console.log("Promise success: ", value);
            if (index in results) return;
            results[index] = value;
            if (!(--counter)) deferred.resolve(results);
          }, function(reason) {
            //console.log("Promise fail: ", reason);
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
  },

  Util : {
    getTreeText: function(id) {
      var map = {
        "DELETE_PERSON_SOURCE_REFERENCE": "Source Detached",
        "ADD_PERSON_SOURCE_REFERENCE": "Source Attached",
        "ADD_LINEAGE": "Added relatives",
        "EDIT_PREFERRED_NAME": "Name Changed",
        "ADD_ALTERNATE_NAME": "Alternate Name Changed",
        "DELETE_ALTERNATE_NAME": "Delete Alternate Name",
        "ADD_COUPLE_EVENT": "Add Couple",
        "DELETE_PARENT_CHILD_RELATIONSHIP": "Delete Parent/Child Relationship"
      }

      return map[id];
    },

    getAngularImage: function (image) {
      console.log("Get image: " + image)
      if (typeof window.manifest === "undefined" || typeof window.manifest.img[name] === "undefined") { return name; }
        console.log("window.manifest.img[image]=" + window.manifest.img[image]);
        return window.manifest.img[image];
      }
    }

});