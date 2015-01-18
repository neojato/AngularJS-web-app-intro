'use strict';

var bookReservationApp = angular.module('bookReservationApp', [])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/books/:bookId', {
    templateUrl: 'views/detail.html',
    controller: 'DetailCtrl'
  })
  .when('/404', {
    templateUrl: 'views/error.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
