'use strict';

angular.module('shop')
	.controller('ShipperController', ['$scope', 'listShipper', 'ShipperService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder',
		function($scope, listShipper, ShipperService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
			var vm = this;
			vm.listShipper = listShipper;

			vm.dtOptions = DTOptionsBuilder.newOptions()
				.withBootstrap()
				.withOption('order', [
					[0, 'asc']
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
				DTColumnDefBuilder.newColumnDef(1).notSortable()
			];

			vm.reloadData = function() {
				ShipperService.getList().then(function(items) {
					vm.listShipper = items;
				});
			};
		}
	]);