'use strict';

var fambookApp = angular.module('fambook', []);

fambookApp.controller('feedController', ['$scope', '$q', 'soiService', 'watchNotifyService', '$location', 'FS', '$http', function ($scope, $q, soiService, watchNotifyService, $location, FS, $http) {
  $scope.alerts = [];
  var promiseArray = [];
  var alertsArray = [];
  var demoData = /demo/.test($location.absUrl());
  var treeUserURL = "https://familysearch.org/ct/user";
  $scope.images = {
    'brian': FS.File.Image('brian.jpg'),
    'michael': FS.File.Image('michael.jpg'),
    'william': FS.File.Image('william.jpg'),
    'nick': FS.File.Image('nick.jpg'),
    'grandma': FS.File.Image('grandma.jpg'),
    'relative': FS.File.Image('relative.jpg')
  }

  if(demoData) {
    var alerts = soiService.getAlertsStatic('');
    var notifications = watchNotifyService.getNotificationsStatic('');
    alertsArray = alertsArray.concat(alerts, notifications);
    console.log("alert array: ",  alertsArray);
    alertsArray = alertsArray.sort(function(a, b) {
      //console.log("a fields: "+ JSON.stringify(a.fields) + " date: " + a.changeTime)
      //console.log("b fields: "+ JSON.stringify(b.fields) + " date: " + b.changeTime)
      return a.changeTime > b.changeTime;
    });
    console.log("alert array: ",  alertsArray);
    $scope.alerts = alertsArray;
    $('.spinner').hide();
  }
  else {
    var deferred = $q.defer();

    promiseArray.push(soiService.getAlerts(user.profile.id));
    promiseArray.push(watchNotifyService.getWatches(user.profile.id));

    FB.Promise.all($q, promiseArray).then(function(results) {
          console.log("controller final results: ", results);
          alertsArray = alertsArray.concat(results[0], results[1]);
          alertsArray = alertsArray.sort(function(a, b) {
            return a.changeTime > b.changeTime;
          });
          //console.log("FINAL ARRAY:" + JSON.stringify(alertsArray));
          deferred.resolve(alertsArray);
        },
        function(event) {
          console.log("controller final results error: ", event);
          deferred.reject(event.status);
        });

    deferred.promise.then(function(results){
      $('.spinner').hide();
      $scope.alerts = results;
    },
    function(event) {
      console.log('Scope.alerts failure', event)
    });

    $http.get(treeUserURL + "?sessionId=" + user.sessionId)
        .success(function(data, status, headers, config) {
          user.personId = data.personId;
        })
        .error(function(data, status, headers, config) {
          console.log("Unable to get user.personId", data, status, headers, config);
        });

  }
}]);
