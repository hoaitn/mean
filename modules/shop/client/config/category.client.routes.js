(function() {
	'use strict';
	// body...
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('shop.category', {
					url: '/category',
					controller: 'ShopCategoryController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/category/list.client.view.html',
					resolve: {
						categories: listCategory
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: 'Loại sản phẩm'
					}
				})
				.state('shop.category.create', {
					url: '/create',
					controller: 'CreateCategoryController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/category/form.client.view.html',
					resolve: {
						category: function() {
							return {};
						}
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: 'Thêm loại sản phẩm'
					}
				})
				.state('shop.category.edit', {
					url: '/:categoryId/edit',
					controller: 'CreateCategoryController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/category/form.client.view.html',
					resolve: {
						category: getCategory
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: '{{category.name}}'
					}
				});
		}
	]);

	listCategory.$inject = ['ProductCategoryService'];

	function listCategory(ProductCategoryService) {
		return ProductCategoryService.getList();
	}

	getCategory.$inject = ['ProductCategoryService', '$stateParams'];

	function getCategory(ProductCategoryService, $stateParams) {
		return ProductCategoryService.getById($stateParams.categoryId);
	}
})();