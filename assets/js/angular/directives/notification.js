'use strict';

fambookApp.directive('notification', function($http) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/notification.ejs',
    link: function(scope, element, attrs, controller) {
      console.log("alert.url: " + scope.alert.url);
      if(scope.alert.url) {
        $http.get(scope.alert.url)
            .success(function(data, status, headers, config) {
              console.log("success data: ", data);
              element.find('.artifactImage').attr('src', data.thumbUrl);
            })
            .error(function(data, status, headers, config) {
              console.log("notification error retrieving image url", data, status, headers, config);
            });
      }
    }
  }
});