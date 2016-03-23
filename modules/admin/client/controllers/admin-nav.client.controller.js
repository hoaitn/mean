'use strict';

angular.module('admin')
	.controller('AdminNavController', ['$scope', 'Authentication', 'Menus',
		function($scope, Authentication, Menus) {
			// Admin nav controller logic
			var vm = this;
			vm.authentication = Authentication;
			vm.menu = Menus.getMenu('sidebar');
			vm.customClass = function() {
				if ($scope.status.isFirstOpen)
					return 'open';
				return 'close';
			};
			$scope.oneAtATime = false;

			$scope.status = {
				isFirstOpen: true,
				isSecondOpen: true,
				isThirdOpen: true
			};
		}
	]);