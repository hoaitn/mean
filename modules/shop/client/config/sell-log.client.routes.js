(function() {
	'use strict';
	// body...
	angular.module('shop.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('shop.sell-log', {
					url: '/sell-log',
					templateUrl: 'modules/shop/client/views/sell-log/list.client.view.html',
					controller: 'ShopSellLogController',
					controllerAs: 'vm',
					resolve: {
						logs: getListLog
					},
					data: {
						roles: ['manager', 'admin']
					},
					ncyBreadcrumb: {
						label: 'Lịch sử hàng bán'
					}
				})
				.state('shop.sell-log.view', {
					url: '/:logId',
					controller: 'ShopSellLogInfoController',
					controllerAs: 'vm',
					templateUrl: 'modules/shop/client/views/sell-log/view.client.view.html',
					resolve: {
						log: getLog
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

	getListLog.$inject = ['SellLogService'];

	function getListLog(SellLogService) {
		return SellLogService.getList();
	}
	getLog.$inject = ['SellLogService', '$stateParams'];

	function getLog(SellLogService, $stateParams) {
		return SellLogService.getById($stateParams.logId);
	}
})();