(function() {
	'use strict';
	// body...
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('shop.cart', {
					url: '/cart',
					templateUrl: 'modules/shop/client/views/cart/list.client.view.html',
					controller: 'ShopCartController',
					controllerAs: 'vm',
					resolve: {
						carts: getListCart
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: '{{"menu.order" | translate}}'
					}
				})
				.state('shop.cart.create', {
					url: '/create',
					controller: 'CreateCartController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/cart/form.client.view.html',
					resolve: {
						cart: function() {
							return {
								sellType: 1
							};
						},
						listShipper: listShipper
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: '{{"label.create" | translate}}'
					}
				})
				.state('shop.cart.edit', {
					url: '/:cartId/edit',
					controller: 'CreateCartController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/cart/form.client.view.html',
					resolve: {
						cart: getCart,
						listShipper: listShipper
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: '{{"label.edit | translate"}} {{cart.name}}'
					}
				})
				.state('shop.cart.view', {
					url: '/:cartId',
					controller: 'ViewCartController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/cart/view.client.view.html',
					resolve: {
						invoice: getCart
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: '{{"label.order | translate"}} {{invoice.name}}'
					}
				});
		}
	]);

	getListCart.$inject = ['CartService'];

	function getListCart(CartService) {
		return CartService.getList();
	}
	getCart.$inject = ['CartService', '$stateParams'];

	function getCart(CartService, $stateParams) {
		return CartService.getById($stateParams.cartId);
	}

	listShipper.$inject = ['ShipperService'];

	function listShipper(ShipperService) {
		return ShipperService.getList();
	}
})();