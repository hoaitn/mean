'use strict';

angular.module('shop')
	.controller('CreateColorController', ['$scope', 'toastr', '$log', '$state', 'ColorService', 'color',
		function($scope, toastr, $log, $state, ColorService, color) {
			// Shop invoice controller logic
			var vm = this;
			vm.color = color;

			vm.save = function(event) {

				if (vm.color._id) {
					vm.color.save().then(function(res) {
						vm.color = res;

						toastr.success('Cập nhật màu thành công!', 'Thông báo!');
					});
				} else {
					ColorService.create(vm.color).then(function(res) {
						toastr.success('Thêm màu mới thành công!', 'Thông báo!');
						$state.go('shop.color.edit', {
							colorId: res._id
						});

					});
				}

			};
		}
	]);