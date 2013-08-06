var myModule = angular.module('fambook', []);
myModule.factory('watchNotifyService', function() {
  var service = {

    getNotifications: function(cisUserId) {
      var params = {watcher: cisUserId};
      $http.get('https://familysearch.org/watch/watches', params).
          success(function(data, status, headers, config) {

//
//            $http.get('https://familysearch.org/watch/watches', params).
//                success(function(data, status, headers, config) {
//                  return data;
//                }).
//                error(function(data, status, headers, config) {
//                  alert("Error getting watchNotify data status: " + status);
//                });
          }).
          error(function(data, status, headers, config) {
            alert("Error getting watchNotify data status: " + status);
          });
    }
  }

  return service;
});