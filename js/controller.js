var costaApp = angular.module('costa', []);

costaApp.controller('MainController', ['$scope','$http', function($scope,$http) {
	$scope.cars=[];
	$scope.title='车型管理';
	$scope.footer='@车挣－史东杰';
	$scope.aCar={};

	$http({
		method: 'GET',
		  url: '/cars'
		}).then(function successCallback(response) {
		    $scope.cars=response.data;
		}, function errorCallback(response) {
	});

	$scope.addCar=function(){
		$http({
		  method: 'POST',
		  url: '/addCar',
		  headers: {
        	'Content-type': 'application/json'
    	  },
		  data:$scope.aCar
		}).then(function successCallback(response) {
		    $scope.cars=response.data;
		}, function errorCallback(response) {
		});
	}

	$scope.deleteCar=function(index){
		$http({
		  method: 'POST',
		  url: '/deleteCar',
		  headers: {
        	'Content-type': 'application/json'
    	  },
		  data:{'index':index}
		}).then(function successCallback(response) {
		    $scope.cars=response.data;
		}, function errorCallback(response) {
		});
	}
}]);