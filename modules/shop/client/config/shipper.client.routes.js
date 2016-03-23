(function() {
	'use strict';
	// body...
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('shop.shipper', {
					url: '/shipper',
					controller: 'ShipperController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/shipper/list.client.view.html',
					resolve: {
						listShipper: listShipper
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: 'Shipper'
					}
				})
				.state('shop.shipper.create', {
					url: '/create',
					controller: 'ShipperModelController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/shipper/model.client.view.html',
					resolve: {
						shipper: function() {
							return {};
						}
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: 'Thêm shipper'
					}
				})
				.state('shop.shipper.edit', {
					url: '/:shipperId/edit',
					controller: 'ShipperModelController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/shipper/model.client.view.html',
					resolve: {
						shipper: getShipper
					},
					data: {
						roles: ['admin']
					},
					ncyBreadcrumb: {
						label: '{{shipper.name}}'
					}
				});
		}
	]);

	listShipper.$inject = ['ShipperService'];

	function listShipper(ShipperService) {
		return ShipperService.getList();
	}

	getShipper.$inject = ['ShipperService', '$stateParams'];

	function getShipper(ShipperService, $stateParams) {
		return ShipperService.getById($stateParams.shipperId);
	}
})();