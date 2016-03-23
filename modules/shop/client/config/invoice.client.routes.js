(function() {
	'use strict';
	// body...
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('shop.invoice', {
					url: '/invoice',
					templateUrl: 'modules/shop/client/views/invoice/list.client.view.html',
					controller: 'ShopInvoiceController',
					controllerAs: 'vm',
					resolve: {
						invoices: getListInvoice
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: 'Hóa đơn'
					}
				})
				.state('shop.invoice.view', {
					url: '/:invoiceId',
					templateUrl: 'modules/shop/client/views/invoice/view.client.view.html',
					controller: 'ShopInvoiceInfoController',
					controllerAs: 'vm',
					resolve: {
						invoice: getInvoice
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: 'Chi tiết'
					}
				});
		}
	]);

	getListInvoice.$inject = ['InvoiceService'];

	function getListInvoice(InvoiceService) {
		return InvoiceService.getList();
	}
	getInvoice.$inject = ['InvoiceService', '$stateParams'];

	function getInvoice(InvoiceService, $stateParams) {
		return InvoiceService.getById($stateParams.invoiceId);
	}
})();