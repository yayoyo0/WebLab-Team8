angular.module('carfix', [])
.controller('getData', function ($scope, $http) {
	$http.get('http://127.0.0.1:3000/')
	.success(function(data, status, headers, config) {
		$scope.clientes = data;
	  })
	  .error(function(data, status, headers, config) {
	  	$scope.clientes = data;
	  });
});