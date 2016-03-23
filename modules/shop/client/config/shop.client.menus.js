'use strict';

// Configuring the Articles module
angular.module('shop.admin').run(['Menus',
	function(Menus) {
		// Add the articles dropdown item
		/*Menus.addMenuItem('sidebar', {
			title: 'Shop',
			state: 'shop',
			roles: ['manager', 'admin'],
			icon: 'shopping-cart'
		});*/
		Menus.addMenuItem('sidebar', {
			title: 'menu.sell_history',
			state: 'shop.sell-log',
			icon: 'history',
			roles: ['admin']
		});

		Menus.addMenuItem('sidebar', {
			title: 'menu.category',
			state: 'shop.category',
			position: 1,
			icon: 'hashtag',
			roles: ['admin']
		});

		Menus.addMenuItem('sidebar', {
			title: 'label.product_list',
			state: 'shop.product',
			position: 2,
			icon: 'code',
			roles: ['admin']
		});

		/*Menus.addMenuItem('sidebar', {
			title: 'Nhập hàng',
			state: 'shop.product-child',
			position: 3,
			icon: 'file-o',
			roles: ['admin']
		});*/

		Menus.addMenuItem('sidebar', {
			title: 'label.color',
			state: 'shop.color',
			position: 4,
			icon: 'cubes',
			roles: ['admin']
		});

		Menus.addMenuItem('sidebar', {
			title: 'menu.product',
			position: 5,
			state: 'shop.product-sell',
			icon: 'cube'
		});

		Menus.addMenuItem('sidebar', {
			title: 'menu.invoice',
			position: 6,
			icon: 'ambulance',
			state: 'shop.invoice'
		});

		Menus.addMenuItem('sidebar', {
			title: 'menu.order',
			state: 'shop.cart',
			icon: 'money',
			position: 7,
		});
		Menus.addMenuItem('sidebar', {
			title: 'menu.orders',
			state: 'shop.order',
			position: 8,
			icon: 'shopping-bag'
		});

		Menus.addMenuItem('sidebar', {
			title: 'menu.shipper',
			icon: 'users',
			state: 'shop.shipper',
			position: 9
		});
	}
]);