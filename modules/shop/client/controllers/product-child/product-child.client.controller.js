'use strict';

angular.module('shop')
	.controller('ShopProductChildController', ['$scope', 'products', 'ProductChildService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder',
		function($scope, products, ProductChildService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
			var bookmark;

			var vm = this;
			vm.products = products;
			$scope.selected = [];

			vm.dtOptions = DTOptionsBuilder.newOptions()
				.withBootstrap()
				.withOption('order', [
					[1, 'asc']
				])
				.withDOM('<"row"<"col-md-8 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"pull-right"f>>>t<"row"<"col-md-4 col-sm-12"<"inline-controls"l>><"col-md-4 col-sm-12"<"inline-controls text-center"i>><"col-md-4 col-sm-12"p>>')
				.withLanguage({
					sLengthMenu: 'View _MENU_ records',
					sInfo: 'Found _TOTAL_ records',
					oPaginate: {
						sPage: 'Page',
						sPageOf: 'of'
					}
				})
				.withPaginationType('input')
				//.withScroller()
				//.withOption("sScrollY", false)
				//.withOption("sScrollX")
				.withColumnFilter();


			vm.dtColumnDefs = [
				DTColumnDefBuilder.newColumnDef(0).notSortable(),
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
				ProductChildService.getList().then(function(products) {
					vm.products = products;
				});
			};

			$scope.$on('reload-product-child', function() {
				vm.reloadData();
			});

		}
	]);