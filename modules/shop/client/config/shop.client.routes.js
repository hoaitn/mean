(function() {
	'use strict';

	//Setting up route
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			// Shop state routing
			$stateProvider
				.state('shop', {
					parent: 'admin',
					url: '/shop',
					template: '<ui-view/>',
					resolve: {},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: 'Shop'
					}
				})
				.state('shop.product-sell', {
					url: '/product-sell',
					controller: 'ShopProductSellController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/product-sell/list.client.view.html',
					resolve: {
						products: getProduct
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: 'Sản phẩm'
					}
				});
		}
	]);


	getProduct.$inject = ['ProductChildService'];

	function getProduct(ProductChildService) {
		return ProductChildService.showAll();
	}
})();