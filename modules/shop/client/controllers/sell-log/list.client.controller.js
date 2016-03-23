'use strict';

angular.module('shop')
	.controller('ShopSellLogController', ['$scope', 'SellLogService', 'logs', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder',
		function($scope, SellLogService, logs, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
			// Shop invoice controller logic			

			var vm = this;
			vm.logs = logs;

			vm.dtOptions = DTOptionsBuilder.newOptions()
				.withBootstrap()
				.withOption('order', [
					[2, 'desc']
				])
				.withLanguage({
					sLengthMenu: 'View _MENU_ records',
					sInfo: 'Found _TOTAL_ records',
					oPaginate: {
						sPage: 'Page',
						sPageOf: 'of'
					}
				})
				.withPaginationType('input')
				.withColumnFilter();


			vm.dtColumnDefs = [
				//DTColumnDefBuilder.newColumnDef(7).notSortable()
			];

			vm.reloadData = function() {
				SellLogService.getList().then(function(invoices) {
					vm.logs = logs;
				});
			};

		}
	]);