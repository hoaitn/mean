(function() {
	'use strict';

	// Setting up route
	angular.module('admin.admin.routes').config(['$stateProvider',
		function($stateProvider) {

			// Admin state routing
			$stateProvider
				.state('dashboard', {
					parent: 'admin',
					url: '/dashboard',
					controller: 'DashboardController',
					controllerAs: 'vm',
					templateUrl: 'modules/admin/client/views/dashboard.client.view.html',
					data: {
						roles: ['manager', 'admin']
					}
				})
				.state('statistics', {
					parent: 'admin',
					url: '/statistics',
					controller: 'AdminStatisticsController',
					controllerAs: 'vm',
					templateUrl: 'modules/admin/client/views/statistics/index.client.view.html',
					data: {
						roles: ['admin']
					}

				});

		}
	]);

})();