angular.module('carfix', ['ui.bootstrap'])
.controller('getData', function ($scope, $http) {
	$scope.sortType     = 'name'; // set the default sort type
 	$scope.sortReverse  = false;  // set the default sort order
  	$scope.searchClient   = '';     // set the default search/filter term
  	$scope.errors = [];
    $scope.msgs = [];
    $scope.error = false;

	$http.get('http://carfix-rodriguezramirez.rhcloud.com/clients')
	.success(function(data, status, headers, config) {
		$scope.clientes = data;
        console.log($scope.clientes);
	  })
	  .error(function(data, status, headers, config) {
	  	$scope.clientes = data;
	  });

	$scope.save = function() {
        var client = {
        	"name" 	  : $scope.name,
        	"address" : $scope.address,
        	"phone"   : $scope.phone,
        	"email"   : $scope.email
        	};
            $scope.errors.splice(0, $scope.errors.length);
            $scope.msgs.splice(0, $scope.msgs.length);

            if($scope.name == undefined || $scope.address == undefined || $scope.phone == undefined){
                $scope.errors.push("Please fill all fields.");
                $scope.error = true;
            }
            else{
                $http.post('http://carfix-rodriguezramirez.rhcloud.com/clients', client)
                .success(function(data, status, headers, config) {
                    $http.get('http://carfix-rodriguezramirez.rhcloud.com/clients')
                    .success(function(data, status, headers, config) {
                        $scope.clientes = data;
                    });
                })
                .error(function(data, status) {
                        $scope.errors.push(status);
                });
            }
      };

    $scope.delete = function(name) {
        $http.delete('http://carfix-rodriguezramirez.rhcloud.com/clients/' + name)
        .success(function (data, status) {
            $http.get('http://carfix-rodriguezramirez.rhcloud.com/clients')
                .success(function(data, status, headers, config) {
                    $scope.clientes = data;
                })
                .error(function(data, status) {
                        $scope.errors.push(status);
                });
        });
    };
});