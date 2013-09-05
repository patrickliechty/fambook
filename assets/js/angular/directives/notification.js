'use strict';

fambookApp.directive('notification', ['$http', function($http) {
  return {
    restrict: 'E',
    templateUrl: '/partials/notification.ejs',
    link: function(scope, element, attrs, controller) {
      if(scope.alert && scope.alert.url) {
        //console.log("alert.url: " + scope.alert.url);
        if(scope.alert.url) {
          $http.get(scope.alert.url)
              .success(function(data, status, headers, config) {
                //console.log("success data: ", data);
                element.find('.artifactImage').attr('src', data.thumbUrl);
              })
              .error(function(data, status, headers, config) {
                console.log("notification error retrieving image url", data, status, headers, config);
              });

          $http.get('https://familysearch.org/artifactmanager/persons/' + scope.alert.context.taggedPersonId)
              .success(function(data, status, headers, config) {
                console.log("get artifact tree id success data: ", data);
                element.find('.artifactImage').attr('src', data.thumbUrl);
                element.find('.relationshipCalculator a').attr('data-control', "relationshipCalc");
                var dataConfig = "{ \"personId\": \"" + user.personId +
                    "\", \"findPersonId\": \"" + data.personId +
                    "\", \"sessionId\":\"" + user.sessionId +
                    "\", \"currentUserName\": \"" + user.profile.displayName + "\", \"currentUserGender\": \"" +
                    (user.profile.gender || '').toLowerCase() + "\"}";
                element.find('.relationshipCalculator a').attr('data-config', dataConfig).removeClass('hide');
                FS.Controls.init(element, function() {});
              })
              .error(function(data, status, headers, config) {
                console.log("ERROR: Unable to get tree id from artifact", data, status, headers, config);
              });
        }
      }
      else {
        if(scope.alert.concluclusion && scope.alert.conclusion.details && scope.alert.conclusion.details.relationshipId) {
          console.log("Setup relationship cal control")
          element.find('.relationshipCalculator a').attr('data-control', "relationshipCalc");
          var dataConfig = "{ \"personId\": \"" + user.personId +
              "\", \"findPersonId\": \"" + scope.alert.conclusion.details.relationshipId +
              "\", \"sessionId\":\"" + user.sessionId +
              "\", \"currentUserName\": \"" + user.profile.displayName +
              "\", \"currentUserGender\": \"" + (user.profile.gender || '').toLowerCase() + "\"}";
          element.find('.relationshipCalculator a').attr('data-config', dataConfig).removeClass('hide');
          FS.Controls.init(element, function() {});
        }
      }
    }
  }
}]);