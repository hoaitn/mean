'use strict';

angular.module('shop').controller('ShopColorController', ['$scope', 'colors',
	function($scope, listColor) {
		// Color controller logic
		var vm = this;
		vm.listColor = listColor;
	}
]);