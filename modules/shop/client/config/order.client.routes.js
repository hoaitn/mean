(function() {
	'use strict';
	// body...
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('shop.order', {
					url: '/order',
					templateUrl: 'modules/shop/client/views/order/list.client.view.html',
					controller: 'ShopOrderController',
					controllerAs: 'vm',
					resolve: {
						orders: getListOrder
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: 'Hàng đặt'
					}
				})
				.state('shop.order.view', {
					url: '/:orderId',
					templateUrl: 'modules/shop/client/views/order/detail.client.view.html',
					controller: 'ShopOrderInfoController',
					controllerAs: 'vm',
					resolve: {
						order: getOrder,
						listInvoice: listInvoice,
						orderId: ['$stateParams', function($stateParams) {
							return $stateParams.orderId;
						}]
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: '#{{vm.order._id}}'
					}
				})
				.state('shop.order.create-invoice', {
					url: '/:orderId/create-invoice',
					templateUrl: 'modules/shop/client/views/order/create-invoice.client.view.html',
					controller: 'ShopOrderInvoiceController',
					controllerAs: 'vm',
					resolve: {
						order: getOrder,
						invoice: function() {
							return {};
						}
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: 'Tạo hóa đơn'
					}
				});
		}
	]);

	getListOrder.$inject = ['OrderService'];

	function getListOrder(OrderService) {
		return OrderService.getList();
	}

	listInvoice.$inject = ['OrderService', 'order'];

	function listInvoice(OrderService, order) {
		return OrderService.getListInvoice(order);
	}

	getOrder.$inject = ['OrderService', '$stateParams'];

	function getOrder(OrderService, $stateParams) {
		return OrderService.getById($stateParams.orderId);
	}
})();