'use strict';

angular.module('core')
	.controller('ToolbarHeaderController', ['$scope', 'Authentication', 'ThemeService',
		function($scope, Authentication, ThemeService) {
			// Toolbar header controller logic
			var self = this;
			self.authentication = Authentication;
			self.user = self.authentication.user;
			self.listTheme = [{
				name: 'Default',
				value: 'default'
			}, {
				name: 'Sliver',
				value: 'sliver'
			}, {
				name: 'Custom',
				value: 'lego'
			}, {
				name: 'Red',
				value: 'red'
			}, {
				name: 'Pink',
				value: 'pink'
			}, {
				name: 'Purple',
				value: 'purple'
			}, {
				name: 'Deep purple',
				value: 'deep-purple'
			}, {
				name: 'Indigo',
				value: 'indigo'
			}];
			self.themeName = ThemeService.theme;
			$scope.$watch(function() {
				return self.themeName;
			}, function(newValue, oldValue, scope) {
				if (newValue !== oldValue) {
					console.log(newValue);
					ThemeService.setTheme(newValue);
				}
			});
		}
	]);