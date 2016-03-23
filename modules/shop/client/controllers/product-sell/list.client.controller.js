'use strict';

angular.module('shop')
	.controller('ShopProductSellController', ['$scope', 'products', 'ProductChildService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder',
		function($scope, products, ProductChildService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
			var vm = this;
			vm.products = products;
			$scope.selected = [];

			vm.dtOptions = DTOptionsBuilder.newOptions()
				.withBootstrap()
				.withOption('order', [
					[1, 'asc']
				])
				//.withDOM('<"row"<"col-md-8 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"pull-right"f>>>t<"row"<"col-md-4 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"inline-controls text-center"i>><"col-md-4 col-sm-12"p>>')
				.withLanguage({
					sLengthMenu: 'Hiển thị _MENU_ sản phẩm',
					sInfo: 'Tìm thấy _TOTAL_ sản phẩm',
					oPaginate: {
						sPage: 'Page',
						sPageOf: 'of'
					}
				})
				//.withColVis()
				.withPaginationType('input')
				.withColumnFilter();


			vm.dtColumnDefs = [
				DTColumnDefBuilder.newColumnDef(0).notSortable(),
				DTColumnDefBuilder.newColumnDef(3).notSortable(),
				DTColumnDefBuilder.newColumnDef(4).notSortable()
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

			$scope.reloadData = function() {
				ProductChildService.showAll().then(function(succ) {
					vm.products = succ;
				});
			};
		}
	]);