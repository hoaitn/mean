'use strict';

angular.module('shop')
	.controller('ShopInvoiceController', ['$scope', 'InvoiceService', 'invoices', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder',
		function($scope, InvoiceService, invoices, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
			// Shop invoice controller logic			

			var vm = this;
			$scope.selected = [];
			vm.invoices = invoices;

			vm.dtOptions = DTOptionsBuilder.newOptions()
				.withBootstrap()
				.withOption('order', [
					[3, 'desc']
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
				DTColumnDefBuilder.newColumnDef(7).notSortable()
			];

			vm.selectedAll = false;

			vm.selectAll = function() {

				if ($scope.selectedAll) {
					$scope.selectedAll = false;
				} else {
					$scope.selectedAll = true;
				}

				angular.forEach(vm.products, function(product) {
					product.selected = $scope.selectedAll;
				});
			};

			vm.reloadData = function() {
				InvoiceService.getList().then(function(invoices) {
					vm.invoices = invoices;
				});
			};

		}
	]);