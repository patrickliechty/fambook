'use strict';

var fambookApp = angular.module('fambook', []);

fambookApp.controller('feedController', function ($scope, $q, soiService, watchNotifyService) {
  $scope.alerts = [];
  var promiseArray = [];
  var alertsArray = [];

  promiseArray.push(soiService.getAlerts(''));
  promiseArray.push(watchNotifyService.getWatches(''));

  var deferred = $q.defer();

  FB.Promise.all($q, promiseArray).then(function(results) {
        console.log("controller final results: ", results);
        alertsArray = alertsArray.concat(results[0], results[1]);
        //results.sort();
        console.log("controller final results1: ", results);
        deferred.resolve(alertsArray);
      },
      function(event) {
        console.log("controller final results error: ", event);
        deferred.reject(event.status);
      });

  //$scope.alerts = watchNotifyService.getWatches();
  deferred.promise.then(function(results){
    console.log("Hide spinner: ", results);
    $('.spinner').hide();
    $scope.alerts = results;
  },
  function(event) {
    console.log('Scope.alerts failure', event)
  });
});



//angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives'])
//    .config(function ($routeProvider, $locationProvider) {
//      $routeProvider.when('/events', {templateUrl: '/partials/eventList.html', controller: EventListController });
//      $routeProvider.when('/event/:eventId', {templateUrl: '/partials/event.html', controller: EventController})
//      $routeProvider.otherwise({redirectTo: '/events'});
//      $locationProvider.html5Mode(true);
//    });