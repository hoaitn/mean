(function() {
    'use strict';

    angular
        .module('shop')
        .controller('ShopOrderInfoController', ShopOrderInfoController);

    ShopOrderInfoController.$inject = ['$scope', 'order', 'listInvoice', 'OrderService', 'toastr'];

    function ShopOrderInfoController($scope, order, listInvoice, OrderService, toastr) {
        var vm = this;

        // Order controller logic

        vm.order = order;
        vm.listInvoice = listInvoice;

        vm.done = function() {
            if (!vm.order.isLocked) {
                OrderService.done(vm.order).then(function(res) {
                    toastr.success('Đơn hàng đã được xử lý!', 'Thông báo!');
                }, function(err) {
                    toastr.error(err.message, 'Thông báo!');
                });
            } else {
                toastr.info('Đơn hàng đã xử lý rồi!', 'Thông báo!');
            }

        };

        vm.totalDiscount = function() {
            var total = 0;
            angular.forEach(vm.order.products, function(item) {
                if (item.product.available >= item.quantity) {
                    total += item.quantity * item.product.product.priceSell * item.discount / 100;
                }
            });
            return total;
        };

        vm.totalPrice = function() {
            var total = 0;
            angular.forEach(vm.order.products, function(item) {
                if (item.product.available >= item.quantity) {
                    total += item.quantity * item.product.product.priceSell;
                }

            });
            return total;
        };
    }
})();