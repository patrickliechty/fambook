'use strict';

fambookApp.directive('notification', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/notification.ejs'
  }
});