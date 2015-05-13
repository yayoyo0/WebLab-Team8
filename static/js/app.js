angular.module('carfix', ['ui.bootstrap'])
.controller('getData', function ($scope, $http) {
	$scope.sortType     = 'name'; // set the default sort type
 	$scope.sortReverse  = false;  // set the default sort order
  	$scope.searchClient   = '';     // set the default search/filter term
  	$scope.errors = [];
    $scope.msgs = [];
    $scope.error = false;
    $scope.animatedShow;
    $scope.detailedView = false;
    $scope.addCarName = "";

	$http.get('http://carfix-rodriguezramirez.rhcloud.com/clients')
	.success(function(data, status, headers, config) {
		$scope.clientes = data;
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
      };

      $scope.carSave = function() {
        var car =   {
                        "brand"         : $scope.brand,
                        "model"         : $scope.model,
                        "year"          : $scope.year,
                        "kilometers"    : $scope.km,
                        "plates"        : $scope.plates,
                        "sn"            : $scope.sn,
                        "color"         : $scope.color
                    };

      $http.put('http://carfix-rodriguezramirez.rhcloud.com/car/' + $scope.addCarName, car)
        .success(function (data, status, headers, config)
        {
            $http.get('http://carfix-rodriguezramirez.rhcloud.com/clients')
            .success(function(data, status, headers, config) {
                $scope.clientes = data;
              })
              .error(function(data, status, headers, config) {
                $scope.clientes = data;
              });
        });
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

    $scope.setName = function(name){
        $scope.addCarName = name;
    }

    $scope.getDetails = function(name, car){
        $http.get('http://carfix-rodriguezramirez.rhcloud.com/clients/' + name)
    .success(function(data, status, headers, config) {
        $scope.brand = car;
        $scope.clickedName = data.name;
        $scope.clickedAddress = data.address;
        $scope.clickedPhone = data.phone;
        $scope.clickedEmail = data.email;
        $scope.clickedCar = data.cars;
        $scope.detailedView = true;
      })
      .error(function(data, status, headers, config) {
        $scope.clientes = data;
      });
        
        
    }
});