'use strict';

angular.module('admin').controller('MainController', ['$scope', '$http', '$translate',
	function($scope, $http, $translate) {
		// Main controller logic
		$scope.main = {
			title: 'BinShop',
			settings: {
				navbarHeaderColor: 'scheme-default',
				sidebarColor: 'scheme-default',
				brandingColor: 'scheme-default',
				activeColor: 'default-scheme-color',
				headerFixed: true,
				asideFixed: true,
				rightbarShow: false
			}
		};

		$scope.changeLanguage = function(langKey) {
			$translate.use(langKey);
			$scope.currentLanguage = langKey;
		};
		$scope.currentLanguage = $translate.proposedLanguage() || $translate.use();
	}
]);