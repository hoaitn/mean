(function() {
    'use strict';

    angular
        .module('shop')
        .controller('ShopOrderInvoiceController', ShopOrderInvoiceController);

    ShopOrderInvoiceController.$inject = ['$scope', 'order', 'invoice', 'CartService', 'InvoiceService', 'toastr'];

    function ShopOrderInvoiceController($scope, order, invoice, CartService, InvoiceService, toastr) {
        var vm = this;

        vm.order = order;
        vm.products = angular.copy(vm.order.products);
        vm.invoice = invoice;

        vm.removeProduct = function(item) {
            _.remove(vm.products, function(n) {
                return n.product._id === item.product._id;
            });
        };

        vm.makeInvoice = function() {
            var data = {
                customerName: vm.order.member.name || vm.order.name,
                address: vm.order.address,
                phone: vm.order.phone,
                priceShip: vm.order.priceShip,
                discount: vm.totalDiscount(),
                order: vm.order._id,
                products: vm.products,
                subTotalPrice: vm.totalPrice()
            };
            InvoiceService.create(data).then(function(res) {
                toastr.success('Tạo hóa đơn thành công!', 'Thông báo!');
            }, function(err) {
                toastr.error(err.message, 'Thông báo!');
                console.log(err);
            });
        };

        vm.totalDiscount = function() {
            var total = 0;
            angular.forEach(vm.products, function(item) {
                if (item.product.available >= item.quantity) {
                    total += item.quantity * item.product.product.priceSell * item.discount / 100;
                }
            });
            return total;
        };

        vm.totalPrice = function() {
            var total = 0;
            angular.forEach(vm.products, function(item) {
                if (item.product.available >= item.quantity) {
                    total += item.quantity * item.product.product.priceSell;
                }
            });
            return total;
        };
    }
})();