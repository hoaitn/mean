'use strict';

angular.module('shop')
	.controller('ShopCartController', ['$scope', 'toastr', 'CartService', 'ProductService', 'carts', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder',
		function($scope, toastr, CartService, ProductService, carts, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {

			// Shop invoice controller logic
			var bookmark;
			var vm = this;
			vm.invoices = carts;
			$scope.selected = [];

			vm.dtOptions = DTOptionsBuilder.newOptions()
				.withBootstrap()
				.withOption('order', [
					[1, 'asc']
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
				DTColumnDefBuilder.newColumnDef(0).notSortable(),
				DTColumnDefBuilder.newColumnDef(8).notSortable()
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
				CartService.getList().then(function(invoices) {
					vm.invoices = invoices;
				});
			};

			vm.done = function(cart) {
				CartService.done(cart).then(function(succ) {
					toastr.success('Đã xử lý!', 'Thông báo!');
					vm.reloadData();
				});
			};

			vm.remove = function(item) {
				CartService.remove(item).then(function() {
					toastr.success('Đã xử lý!', 'Thông báo!');
					vm.reloadData();
				}, function(err) {
					toastr.error(err.message, 'Có lỗi xảy ra!');
				});
			};

		}
	]);