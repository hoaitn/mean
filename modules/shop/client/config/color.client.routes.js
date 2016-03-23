(function() {
	'use strict';
	// body...
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('shop.color', {
					url: '/color',
					controller: 'ShopColorController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/color/list.client.view.html',
					resolve: {
						colors: getListColor
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: 'Màu'
					}
				})
				.state('shop.color.create', {
					url: '/create',
					controller: 'CreateColorController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/color/form.client.view.html',
					resolve: {
						color: function() {
							return {

							};
						}
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: 'Thêm màu mới'
					}
				})
				.state('shop.color.edit', {
					url: '/:colorId/edit',
					controller: 'CreateColorController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/color/form.client.view.html',
					resolve: {
						color: getColor
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: '{{color.name}}'
					}
				});
		}
	]);

	getListColor.$inject = ['ColorService'];

	function getListColor(ColorService) {
		return ColorService.getList();
	}
	getColor.$inject = ['ColorService', '$stateParams'];

	function getColor(ColorService, $stateParams) {
		return ColorService.getById($stateParams.colorId);
	}
})();