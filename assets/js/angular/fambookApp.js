'use strict';

var app = angular.module('fambook', ['soiService']);

app.controller('feedController', ['$scope', function ($scope) {
  //alert("Feed Controller");
      //$scope.getSoiAlerts = function(cisUserId) {
        //soiService.getAlerts(cisUserId);
      //}
    }
]);




//angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives'])
//    .config(function ($routeProvider, $locationProvider) {
//      $routeProvider.when('/events', {templateUrl: '/partials/eventList.html', controller: EventListController });
//      $routeProvider.when('/event/:eventId', {templateUrl: '/partials/event.html', controller: EventController})
//      $routeProvider.otherwise({redirectTo: '/events'});
//      $locationProvider.html5Mode(true);
//    });