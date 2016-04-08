function NavCtrl($scope, $http){
		$http.get('products/products.json').success(function(data) {
		$scope.items = data.products;
	});
}
