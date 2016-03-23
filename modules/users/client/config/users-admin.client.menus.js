'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('sidebar', {
			title: 'menu.manager',
			icon: 'user-secret',
			state: 'admin.users',
			roles: ['admin']
		});

		Menus.addMenuItem('sidebar', {
			title: 'menu.manager_user',
			icon: 'user',
			state: 'members',
			roles: ['admin']
		});
	}
]);