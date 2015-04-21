angular.module('carfix', [])
.controller('getData', function ($scope, $http) {
	$http.get('http://localhost/clients')
	.success(function(data, status, headers, config) {
		$scope.clientes = data;
	  })
	  .error(function(data, status, headers, config) {
	  	$scope.clientes = data;
	  });
});