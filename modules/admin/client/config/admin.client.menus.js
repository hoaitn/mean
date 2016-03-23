'use strict';

angular.module('admin.admin.routes').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('sidebar', {
			title: 'menu.dashboard',
			state: 'dashboard',
			icon: 'dashboard',
			roles: ['manager', 'admin']
		});

		Menus.addMenuItem('sidebar', {
			title: 'menu.statistics',
			state: 'statistics',
			icon: 'line-chart',
			roles: ['admin']
		});
	}
]);