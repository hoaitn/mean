'use strict';
angular.module('shop')
	.controller('ViewCartController', ['$scope', 'invoice',
		function($scope, invoice) {
			var vm = this;
			vm.invoice = invoice;
		}
	]);