'use strict';

fambookApp.directive('relationshipcalc', ['$http', function($http) {
  return {
    restrict: 'E',
    templateUrl: '/partials/relationshipcalc.ejs',
    link: function(scope, element, attrs, controller) {
      if(scope.alert && scope.alert.url) {
        //console.log("alert.url: " + scope.alert.url);
        if(user.personId && scope.alert.url) {
          $http.get('https://familysearch.org/artifactmanager/persons/' + scope.alert.context.taggedPersonId)
              .success(function(data, status, headers, config) {
                console.log("Setup relationship calc for photo alert")
                console.log("get artifact tree id success data: ", data);
                element.find('a').attr('data-control', "relationshipCalc");
                var dataConfig = "{ \"personId\": \"" + user.personId +
                    "\", \"findPersonId\": \"" + data.personId +
                    "\", \"sessionId\":\"" + user.sessionId +
                    "\", \"currentUserName\": \"" + user.profile.displayName + "\", \"currentUserGender\": \"" +
                    (user.profile.gender || '').toLowerCase() + "\"}";
                element.find('a').attr('data-config', dataConfig).removeClass('hide');
                FS.Controls.init(element, function() {});
              })
              .error(function(data, status, headers, config) {
                console.log("ERROR: Unable to get tree id from artifact", data, status, headers, config);
              });
        }
      }
      else {
        if(user.personId && scope.alert.conclusion.details.relationshipId) {
          console.log("Setup relationship calc for tree alert")
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