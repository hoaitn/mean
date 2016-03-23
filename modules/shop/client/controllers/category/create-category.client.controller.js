'use strict';

angular.module('shop')
	.controller('CreateCategoryController', ['$scope', '$state', 'category', 'ProductCategoryService', 'toastr',
		function($scope, $state, category, ProductCategoryService, toastr) {
			var vm = this;
			vm.category = category;
			vm.save = function() {
				if (vm.category._id) {
					vm.category.save().then(function(res) {
						toastr.success('Cập nhật dòng SP thành công!', 'Thông báo!');
					});
				} else {
					ProductCategoryService.create(vm.category).then(function(res) {
						toastr.success('Thêm dòng sản phẩm thành công!', 'Thông báo!');
						$state.go('shop.category.edit', {
							categoryId: res._id
						});
					});
				}

			};
		}
	]);