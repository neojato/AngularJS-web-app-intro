'use strict';

var books, userId = 1;

var getBooks = function($http, $q) {

	var deferred = $q.defer();

	if (!books) {
		$http.get('scripts/data/books.json').success(function(data) {
			books = data.items;
			deferred.resolve(data.items);
		});
	} else {
		deferred.resolve(books);
	}

	return deferred.promise;
};

bookReservationApp.controller('MainCtrl', function($scope, $http, $q) {
	getBooks($http, $q).then(function(books) {
		$scope.books = books;
	});
});

bookReservationApp.controller('DetailCtrl', function($scope, $routeParams, $http, $q, $location) {
	getBooks($http, $q).then(function(books) {
		$scope.books = books;
		//filter out from the array the book id and grab the first match
		$scope.book = books.filter(function(book) {
			return (parseInt($routeParams.bookId, 10) === book.id);
		})[0];

		if (!$scope.book) {
			console.log('redirect to 404');
			$location.path('/404');
			//$scope.$apply();
		}

		$scope.youReserved = function() {
			if ($scope.book.reservedBy.some(function(item) {
				return (item === userId);
			})) {
				return true;
			} else {
				return false;
			}
		};

		$scope.reserve = function() {
			var date = new Date();
			if (!$scope.book.dueDate) {
				$scope.book.dueDate = date.setDate(date.getDate() + 7);
				$scope.book.formattedDueDate = new Date($scope.book.dueDate).toDateString();
			} else {
				var oldDate = new Date($scope.book.dueDate);
				var newDate = new Date(oldDate);
				newDate.setDate(newDate.getDate() + 7);
				var nd = new Date(newDate);

				$scope.book.formattedFromDate = oldDate.toDateString();
				$scope.book.formattedDueDate = nd.toDateString();
			}

			$scope.book.reservedBy.push(userId);
		};

		$scope.cancel = function() {
			$scope.book.dueDate = null;
			$scope.book.formattedDueDate = null;
			$scope.book.formattedFromDate = null;
			$scope.book.reservedBy.pop();
		};
	});
});