'use strict';

angular.module('shop')
	.controller('ShopProductController', ['$scope', '$uibModal', 'products', 'ProductService', 'ProductChildService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder',
		function($scope, $uibModal, products, ProductService, ProductChildService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
			var bookmark;
			var vm = this;
			vm.products = products;

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

			$scope.selected = [];

			vm.reloadData = function() {
				ProductService.getList().then(function(products) {
					vm.products = products;
				});
			};

			$scope.$on('reload-product', function() {
				vm.reloadData();
			});

			vm.openSplash = function(product, event) {

				var options = angular.element(event.target).data('options');

				ProductChildService.getByCode(product.code).then(function(res) {

					var modalInstance = $uibModal.open({
						templateUrl: 'modules/shop/client/views/product/show-by-code.client.view.html',
						controller: 'QuickViewController',

						backdropClass: 'splash' + ' ' + options,
						windowClass: 'splash' + ' ' + options,
						resolve: {
							data: {
								name: res.code,
								data: res.products
							}
						}
					});

					modalInstance.result.then(function(selectedItem) {
						$scope.selected = selectedItem;
					}, function() {

					});

				});


			};
		}
	]);