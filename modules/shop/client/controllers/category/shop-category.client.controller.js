'use strict';

angular.module('shop').controller('ShopCategoryController', ['$scope', 'categories', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ProductCategoryService',

	function($scope, listCategory, DTOptionsBuilder, DTColumnDefBuilder, ProductCategoryService) {
		// Shop category controller logic
		var vm = this;
		vm.categories = listCategory;

		vm.dtOptions = DTOptionsBuilder.newOptions()
			.withBootstrap()
			.withOption('order', [
				[0, 'asc']
			])
			.withLanguage({
				sLengthMenu: 'Hiển thị _MENU_ dòng sản phẩm',
				sInfo: 'Tìm thấy _TOTAL_ dòng sản phẩm',
				oPaginate: {
					sPage: 'Page',
					sPageOf: 'of'
				}
			})
			//.withColVis()
			.withPaginationType('input')
			.withColumnFilter();


		vm.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(2).notSortable()
		];

		vm.reloadData = function() {
			ProductCategoryService.getList().then(function(categories) {
				vm.categories = categories;
			});
		};

		$scope.$on('reload-category', function() {
			vm.reloadData();
		});
	}
]);