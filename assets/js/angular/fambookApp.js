'use strict';

var fambookApp = angular.module('fambook', []);

fambookApp.controller('feedController', function ($scope, soiService, watchNotifyService) {
  $scope.alerts = [];
  //$scope.alerts = soiService.getAlertsStatic('');

  //$scope.alerts = watchNotifyService.getNotificationsStatic();
  $scope.alerts = watchNotifyService.getWatches();
  console.log("scope.alerts: ", $scope.alerts);
});



//angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives'])
//    .config(function ($routeProvider, $locationProvider) {
//      $routeProvider.when('/events', {templateUrl: '/partials/eventList.html', controller: EventListController });
//      $routeProvider.when('/event/:eventId', {templateUrl: '/partials/event.html', controller: EventController})
//      $routeProvider.otherwise({redirectTo: '/events'});
//      $locationProvider.html5Mode(true);
//    });