'use strict';

angular.module('core').directive('checkRole', ['Authentication',
	function(Authentication) {
		return {
			restrict: 'AE',
			scope: false,
			transclude: false,
			replace: true,
			link: function(scope, element, attr) {

			},
			compile: function(element, attr) {
				var hasRole = true;
				var user = Authentication.user;

				var access = attr.access.split(' ');

				if (!_.intersection(user.roles, access).length) {
					hasRole = false;
				}

				return {
					pre: function preLink(scope, iElement, iAttrs, controller) {

					},
					post: function postLink(scope, iElement, iAttrs, controller) {
						if (!hasRole) {
							iElement.remove();
						}
					}
				};

			}
		};
	}
]);