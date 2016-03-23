(function() {
	'use strict';
	// body...
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('shop.product', {
					url: '/product',
					controller: 'ShopProductController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/product/list.client.view.html',
					resolve: {
						products: listProduct
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: 'Mã sản phẩm'
					}
				})
				.state('shop.product.create', {
					url: '/create',
					controller: 'CreateProductController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/product/form.client.view.html',
					resolve: {
						product: function() {
							return {};
						},
						categories: listCategory,
						colors: listColor,
						products: function() {
							return [];
						}
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: 'Thêm mã sản phẩm'
					}
				})
				.state('shop.product.edit', {
					url: '/:productId/edit?tab',
					controller: 'CreateProductController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/product/model.client.view.html',
					resolve: {
						product: getProduct,
						categories: listCategory,
						colors: listColor,
						products: listProductByID
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

	listProduct.$inject = ['ProductService'];

	function listProduct(ProductService) {
		return ProductService.getList();
	}
	getProduct.$inject = ['ProductService', '$stateParams'];

	function getProduct(ProductService, $stateParams) {
		return ProductService.getById($stateParams.productId);
	}

	listCategory.$inject = ['ProductCategoryService'];

	function listCategory(ProductCategoryService) {
		return ProductCategoryService.getList();
	}

	listProductByID.$inject = ['ProductService', 'product'];

	function listProductByID(ProductService, product) {
		return ProductService.getChild(product);
	}

	listColor.$inject = ['ColorService'];

	function listColor(ColorService) {
		return ColorService.getList();
	}
})();