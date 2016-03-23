'use strict';

angular.module('shop')
	.controller('ShipperModelController', ['$scope', 'shipper', 'ShipperService', 'toastr', '$state',
		function($scope, shipper, ShipperService, toastr, $state) {
			var vm = this;
			vm.shipper = shipper;

			vm.save = function() {
				if (vm.shipper._id) {
					vm.shipper.save().then(function(res) {
						toastr.success('Thành công!', 'Thông báo!');
					});
				} else {
					ShipperService.create(vm.shipper).then(function(res) {
						toastr.success('Thêm shipper thành công!', 'Thông báo!');
						$state.go('shop.shipper.edit', {
							shipperId: res._id
						});
					});
				}

			};
		}
	]);