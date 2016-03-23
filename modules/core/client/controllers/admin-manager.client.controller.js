'use strict';

angular.module('core').controller('AdminManagerController', ['$scope', 'ThemeService',
	function($scope, ThemeService) {
		// Admin manager controller logic
		var self = this;
		$scope.themeName = ThemeService.theme;
		$scope.$watch(function() {
			return ThemeService.theme;
		}, function(newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.themeName = newVal;
			}
		});
	}
]);