(function() {
	'use strict';
	// body...
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('shop.product-child', {
					url: '/product-child',
					controller: 'ShopProductChildController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/product-child/list.client.view.html',
					resolve: {
						products: listProduct
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: 'Sản phẩm'
					}
				})
				.state('shop.product-child.create', {
					url: '/create',
					controller: 'CreateProductChildController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/product-child/form.client.view.html',
					resolve: {
						product: function() {
							return {};
						},
						codes: listCode,
						colors: listColor,
						plugins: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'vendor/filestyle/bootstrap-filestyle.min.js'
							]);
						}]
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: 'Tạo sản phẩm mới'
					}
				})
				.state('shop.product-child.edit', {
					url: '/:productId/edit',
					controller: 'CreateProductChildController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/product-child/form.client.view.html',
					resolve: {
						product: getProduct,
						codes: listCode,
						colors: listColor,
						plugins: ['$ocLazyLoad', function($ocLazyLoad) {
							return $ocLazyLoad.load([
								'vendor/filestyle/bootstrap-filestyle.min.js'
							]);
						}]
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: '{{product.name}}'
					}
				});
		}
	]);

	listProduct.$inject = ['ProductChildService'];

	function listProduct(ProductChildService) {
		return ProductChildService.getList();
	}

	getProduct.$inject = ['ProductChildService', '$stateParams'];

	function getProduct(ProductChildService, $stateParams) {
		return ProductChildService.getById($stateParams.productId);
	}

	listCode.$inject = ['ProductService'];

	function listCode(ProductService) {
		return ProductService.getAllCode();
	}

	listColor.$inject = ['ColorService'];

	function listColor(ColorService) {
		return ColorService.getList();
	}
})();