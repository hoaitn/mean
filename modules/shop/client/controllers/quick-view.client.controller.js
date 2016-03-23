'use strict';

angular.module('shop')
	.controller('QuickViewController', ['$scope', '$uibModalInstance', 'data',
		function($scope, $uibModalInstance, data) {
			// Quick view controller logic
			$scope.data = data;


			$scope.ok = function() {
				$uibModalInstance.close();
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};
		}
	]);