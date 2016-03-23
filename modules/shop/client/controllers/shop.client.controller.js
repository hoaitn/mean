'use strict';

angular.module('shop')
	.controller('ShopController', ['$scope', 'products', 'codes', 'categories',
		function($scope, listProduct, listCode, listCategory) {
			// Controller Logic			
			$scope.listProduct = listProduct;
			$scope.listCode = listCode;
			$scope.listCategory = listCategory;
		}
	]);